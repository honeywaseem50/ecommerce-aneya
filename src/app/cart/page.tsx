 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CartItem,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setLoaded(true);
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCart(getCart());
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const freeDeliveryLimit = 3000;
  const delivery = subtotal > freeDeliveryLimit ? 0 : 250;
  const total = subtotal + delivery;

  const remainingAmount = Math.max(
    0,
    freeDeliveryLimit + 1 - subtotal
  );

  const progress = Math.min(
    (subtotal / (freeDeliveryLimit + 1)) * 100,
    100
  );

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0]">
        <p className="text-[#063A5F]">Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0]">

      {/* HEADER */}
      <header className="bg-[#063A5F] px-5 py-6 text-center text-white">
        <Link href="/" className="font-serif text-2xl tracking-wider">
          Jewlina by Aneya
        </Link>

        <p className="mt-2 text-[10px] tracking-[4px] text-[#D6B45C]">
          ELEGANCE IN EVERY DETAIL
        </p>
      </header>

      {/* PAGE TITLE */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="text-xs tracking-[4px] text-[#D6B45C]">
          YOUR SHOPPING BAG
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#063A5F]">
          Shopping Cart
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Review your selected products before checkout.
        </p>
      </section>

      {cart.length === 0 ? (
        /* EMPTY CART */
        <section className="mx-auto max-w-7xl px-5 pb-24 text-center">
          <div className="border border-[#D6B45C]/40 bg-white px-6 py-16">
            <h2 className="font-serif text-3xl text-[#063A5F]">
              Your Cart is Empty
            </h2>

            <p className="mt-4 text-sm text-gray-500">
              You haven't added any products to your cart yet.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block bg-[#063A5F] px-10 py-4 text-xs tracking-[2px] text-white transition hover:bg-[#D6B45C] hover:text-[#063A5F]"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </section>
      ) : (
        /* CART ITEMS */
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-3">

          {/* PRODUCTS */}
          <div className="space-y-5 lg:col-span-2">

            {/* FREE DELIVERY PROGRESS */}
            <div className="border border-[#D6B45C]/40 bg-white p-6">

              {delivery === 0 ? (
                <div>
                  <p className="font-serif text-xl text-[#063A5F]">
                    Congratulations! Your delivery is FREE!
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    You've unlocked free delivery on your order.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-serif text-lg text-[#063A5F]">
                    Add Rs. {remainingAmount.toLocaleString("en-PK")} more
                    to get FREE delivery!
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Shop for more than Rs. 3,000 and enjoy free delivery.
                  </p>
                </div>
              )}

              {/* PROGRESS BAR */}
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#D6B45C] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-400">
                <span>Rs. 0</span>
                <span>Rs. 3,001</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-[#D6B45C]/40 pb-4">
              <h2 className="font-serif text-2xl text-[#063A5F]">
                Your Products ({cart.length})
              </h2>

              <button
                onClick={handleClearCart}
                className="text-xs text-red-600 underline"
              >
                Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 border border-[#D6B45C]/30 bg-white p-5 sm:flex-row"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-36 w-full object-cover sm:w-36"
                />

                {/* DETAILS */}
                <div className="flex flex-1 flex-col justify-between">

                  <div>
                    <p className="text-xs tracking-[2px] text-[#D6B45C]">
                      {item.category}
                    </p>

                    <h3 className="mt-2 font-serif text-xl text-[#063A5F]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Rs. {item.price.toLocaleString("en-PK")}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                    {/* QUANTITY */}
                    <div className="flex items-center border border-[#D6B45C]">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="px-4 py-2 text-[#063A5F]"
                      >
                        −
                      </button>

                      <span className="min-w-10 text-center text-sm text-[#063A5F]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="px-4 py-2 text-[#063A5F]"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs text-red-600 underline"
                    >
                      Remove
                    </button>

                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    Item Total
                  </p>

                  <p className="mt-2 font-semibold text-[#063A5F]">
                    Rs. {(item.price * item.quantity).toLocaleString("en-PK")}
                  </p>
                </div>

              </div>
            ))}

            <Link
              href="/shop"
              className="inline-block pt-3 text-xs tracking-[2px] text-[#063A5F] underline underline-offset-4"
            >
              ← CONTINUE SHOPPING
            </Link>

          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit border border-[#D6B45C]/40 bg-white p-7">

            <h2 className="font-serif text-2xl text-[#063A5F]">
              Order Summary
            </h2>

            <div className="mt-7 flex justify-between border-b border-gray-200 pb-5 text-sm">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-semibold text-[#063A5F]">
                Rs. {subtotal.toLocaleString("en-PK")}
              </span>
            </div>

            <div className="mt-5 flex justify-between text-sm">
              <span className="text-gray-500">
                Delivery Charges
              </span>

              <span className={delivery === 0 ? "font-semibold text-green-700" : "text-[#063A5F]"}>
                {delivery === 0
                  ? "FREE"
                  : `Rs. ${delivery.toLocaleString("en-PK")}`}
              </span>
            </div>

            <div className="mt-6 flex justify-between border-t border-[#D6B45C]/40 pt-6">
              <span className="font-semibold text-[#063A5F]">
                Total
              </span>

              <span className="text-xl font-semibold text-[#063A5F]">
                Rs. {total.toLocaleString("en-PK")}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-8 block w-full bg-[#063A5F] py-4 text-center text-xs tracking-[2px] text-white transition hover:bg-[#D6B45C] hover:text-[#063A5F]"
            >
              PROCEED TO CHECKOUT
            </Link>

            <p className="mt-4 text-center text-xs text-gray-400">
              Secure shopping at Jewlina by Aneya
            </p>

          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#063A5F] px-5 py-10 text-center text-white">
        <h2 className="font-serif text-2xl">
          Jewlina by Aneya
        </h2>

        <p className="mt-3 text-xs tracking-wider text-white/60">
          ELEGANCE IN EVERY DETAIL
        </p>

        <p className="mt-5 text-xs text-white/50">
          © 2026 Jewlina by Aneya. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
