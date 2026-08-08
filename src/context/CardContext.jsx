import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CARDS, SEED_ACTIVATION_CODES } from '../data/mockData';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  // Activation Codes
  const [activationCodes, setActivationCodes] = useState(() => {
    const saved = localStorage.getItem('ikz_activation_codes');
    return saved ? JSON.parse(saved) : SEED_ACTIVATION_CODES;
  });

  // Cards Data
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('ikz_cards');
    return saved ? JSON.parse(saved) : INITIAL_CARDS;
  });

  useEffect(() => {
    localStorage.setItem('ikz_activation_codes', JSON.stringify(activationCodes));
  }, [activationCodes]);

  useEffect(() => {
    localStorage.setItem('ikz_cards', JSON.stringify(cards));
  }, [cards]);

  // Admin: Generate single/bulk activation codes
  const generateActivationCodes = (count = 1, prefix = 'IKZ-LUX', type = 'LUXURY FULL VERSION') => {
    const newCodes = [];
    const today = new Date().toISOString().split('T')[0];

    for (let i = 0; i < count; i++) {
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const codeStr = `${prefix.toUpperCase()}-${randomPart}`;
      newCodes.push({
        code: codeStr,
        type,
        generatedAt: today,
        status: 'UNUSED',
        usedBy: null,
        usedForCardId: null,
        usedAt: null
      });
    }

    setActivationCodes(prev => [...newCodes, ...prev]);
    return newCodes;
  };

  // User: Activate card with code
  const activateCardWithCode = (cardId, userEmail, codeInput) => {
    const cleanCode = codeInput.trim().toUpperCase();
    const foundCode = activationCodes.find(c => c.code === cleanCode);

    if (!foundCode) {
      return { success: false, message: 'Kod Aktivasi tidak ditemui atau tidak sah!' };
    }

    if (foundCode.status === 'ACTIVE' || foundCode.status === 'USED') {
      return { success: false, message: 'Kod Aktivasi ini telah digunakan oleh pengguna lain!' };
    }

    const today = new Date().toISOString().split('T')[0];

    // Update code status
    setActivationCodes(prev =>
      prev.map(c =>
        c.code === cleanCode
          ? { ...c, status: 'ACTIVE', usedBy: userEmail, usedForCardId: cardId, usedAt: today }
          : c
      )
    );

    // Update card activation
    setCards(prev =>
      prev.map(card =>
        card.id === cardId
          ? { ...card, isActivated: true, activationCode: cleanCode }
          : card
      )
    );

    return { success: true, message: 'Tahniah! Kad Kahwin Digital anda telah BERJAYA DIAKTIFKAN ke Versi Penuh Luxury!' };
  };

  // Save / Update card
  const saveCard = (cardData) => {
    let updatedCard;
    if (cardData.id) {
      setCards(prev =>
        prev.map(c => (c.id === cardData.id ? { ...c, ...cardData } : c))
      );
      updatedCard = cardData;
    } else {
      const newId = `card-${Date.now()}`;
      const newSlug = `${cardData.groomShort || 'adam'}-${cardData.brideShort || 'hawa'}-${Math.floor(Math.random()*100)}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '');
      
      updatedCard = {
        ...cardData,
        id: newId,
        slug: newSlug,
        isActivated: false,
        activationCode: null,
        rsvps: [],
        guestbook: [],
        wishlist: cardData.wishlist || []
      };
      setCards(prev => [updatedCard, ...prev]);
    }
    return updatedCard;
  };

  // Delete card
  const deleteCard = (cardId) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  // Guest RSVP submission
  const addRsvp = (cardId, rsvpData) => {
    const newRsvp = {
      id: `r-${Date.now()}`,
      ...rsvpData,
      createdAt: new Date().toLocaleString('ms-MY')
    };

    setCards(prev =>
      prev.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            rsvps: [newRsvp, ...(card.rsvps || [])]
          };
        }
        return card;
      })
    );
  };

  // Guestbook wish post
  const addGuestbookWish = (cardId, wishData) => {
    const newWish = {
      id: `g-${Date.now()}`,
      name: wishData.name,
      wish: wishData.wish,
      date: new Date().toLocaleString('ms-MY', { dateStyle: 'short', timeStyle: 'short' })
    };

    setCards(prev =>
      prev.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            guestbook: [newWish, ...(card.guestbook || [])]
          };
        }
        return card;
      })
    );
  };

  // Toggle wishlist reservation
  const toggleWishlistItem = (cardId, itemId, reservedByName) => {
    setCards(prev =>
      prev.map(card => {
        if (card.id === cardId) {
          const updatedWishlist = (card.wishlist || []).map(item => {
            if (item.id === itemId) {
              const isRes = !item.isReserved;
              return {
                ...item,
                isReserved: isRes,
                reservedBy: isRes ? reservedByName || 'Tetamu' : null
              };
            }
            return item;
          });
          return { ...card, wishlist: updatedWishlist };
        }
        return card;
      })
    );
  };

  const getCardBySlug = (slug) => {
    return cards.find(c => c.slug === slug || c.id === slug) || cards[0];
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        activationCodes,
        generateActivationCodes,
        activateCardWithCode,
        saveCard,
        deleteCard,
        addRsvp,
        addGuestbookWish,
        toggleWishlistItem,
        getCardBySlug
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
