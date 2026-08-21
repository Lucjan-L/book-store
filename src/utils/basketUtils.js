export function calculateTotal(basket) {
  return basket.reduce((sum, book) => sum + book.price * book.quantity, 0);
}
