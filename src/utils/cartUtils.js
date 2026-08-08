export function calculateTotal(cart) {
  return cart.reduce((sum, book) => sum + book.price * book.quantity, 0);
}
