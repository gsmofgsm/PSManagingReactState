export default function cartReducer(cart, action) {
  // whatever returned from a reducer becomes the new state
  switch (action.type) {
    case "empty":
      return [];
    case "add": {
      const { id, sku } = action;
      // we can pass as many props in action as possible,
      // the only must have is type
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new array with the matching item replaced
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return new array with the new item appended
        return [...cart, { id, sku, quantity: 1 }];
      }
    }
    case "updateQuantity":
      const { sku, quantity } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));

    default:
      throw new Error("Unhandled action" + action.type);
  }
}
