
import type { Product } from "../data/products";

export type CartItem = Product & {
  quantity: number;
};

const CART_KEY = "jewlina_cart";

// GET CART
export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedCart = localStorage.getItem(CART_KEY);

  return savedCart ? JSON.parse(savedCart) : [];
}

// SAVE CART
export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ADD PRODUCT TO CART
export function addToCart(product: Product, quantity: number = 1) {
  const cart = getCart();

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
    });
  }

  saveCart(cart);
}

// UPDATE PRODUCT QUANTITY
export function updateCartQuantity(
  productId: number,
  quantity: number
) {
  const cart = getCart();

  const updatedCart = cart.map((item) =>
    item.id === productId
      ? { ...item, quantity: Math.max(1, quantity) }
      : item
  );

  saveCart(updatedCart);
}

// REMOVE PRODUCT
export function removeFromCart(productId: number) {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => item.id !== productId
  );

  saveCart(updatedCart);
}

// CLEAR CART
export function clearCart() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_KEY);
  }
}
