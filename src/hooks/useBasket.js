import { useState } from "react";

export function useBasket() {
  const [basket, setBasket] = useState([]);

  function addBasketIncreaseQuantity(book) {
    setBasket((prev) => {
      const existing = prev.find((b) => b.key === book.key);

      if (existing) {
        return prev.map((b) =>
          b.key === book.key ? { ...b, quantity: b.quantity + 1 } : b,
        );
      }

      return [...prev, { ...book, quantity: 1 }];
    });
  }

  function decreaseQuantity(book) {
    setBasket((prev) =>
      prev
        .map((b) =>
          b.key === book.key ? { ...b, quantity: b.quantity - 1 } : b,
        )
        // Remove items when their quantity reaches zero
        .filter((b) => b.quantity > 0),
    );
  }

  function removeFromBasket(book) {
    setBasket((prev) => {
      return prev.filter((b) => b.key !== book.key);
    });
  }

  return {
    basket,
    setBasket,
    addBasketIncreaseQuantity,
    decreaseQuantity,
    removeFromBasket,
  };
}
