 
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "../../../data/products";
import { addToCart } from "../../../lib/cart";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const productId = Number(params.id);
  const product = products.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#063A5F]">
            Product Not Found
          </h1>
          <a
            href="/shop"
            className="mt-6 inline-block bg-[#063A5F] px-8 py-3 text-sm text-white"
          >
            BACK TO SHOP
          </a>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <main className="min-h-screen bg-[#FAF7F0]">

      {/* HEADER */}
      <header className="bg-[#063A5F] px-5 py-6 text-center text-white">
        <a href="/" className="font-serif text-2xl tracking-wider">
          Jewlina by Aneya
        </a>
        <p className="mt-2 text-[10px] tracking-[4px] text-[#D6B45C]">
          ELEGANCE IN EVERY DETAIL
        </p>
      </header>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-7 text-xs tracking-wide text-gray-500">
        <a href="/" className="hover:text-[#D6B45C]">HOME</a>
        {" / "}
        <a href="/shop" className="hover:text-[#D6B45C]">SHOP</a>
        {" / "}
        <span className="text-[#063A5F]">
          {product.name.toUpperCase()}
        </span>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:grid-cols-2 md:gap-16">

        {/* IMAGE */}
        <div className="overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-[650px] w-full object-cover"
          />
        </div>

        {/* INFORMATION */}
        <div className="flex flex-col justify-center py-5">

          <p className="text-xs tracking-[4px] text-[#D6B45C]">
            JEWLINA COLLECTION
          </p>

          <h1 className="mt-5 font-serif text-3xl leading-tight text-[#063A5F] sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-sm text-gray-500">
            Collection: {product.category}
          </p>

          <p className="mt-6 text-2xl font-semibold text-[#063A5F]">
            Rs. {product.price.toLocaleString("en-PK")}
          </p>

          <div className="my-8 border-t border-[#D6B45C]/40" />

          <h2 className="font-serif text-2xl text-[#063A5F]">
            Product Description
          </h2>

          <p className="mt-4 text-sm leading-8 text-gray-600">
            Discover timeless elegance with this beautiful piece
            from Jewlina by Aneya. Carefully selected to add a
            touch of sophistication to your everyday look and
            special occasions.
          </p>

          {/* QUANTITY */}
          <div className="mt-9">
            <p className="mb-4 text-xs font-semibold tracking-[2px] text-[#063A5F]">
              SELECT QUANTITY
            </p>

            <div className="flex w-fit items-center border border-[#D6B45C] bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-5 py-3 text-xl text-[#063A5F] hover:bg-[#FAF7F0]"
              >
                −
              </button>

              <span className="min-w-12 text-center text-sm text-[#063A5F]">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-5 py-3 text-xl text-[#063A5F] hover:bg-[#FAF7F0]"
              >
                +
              </button>
            </div>
          </div>

          {/* TOTAL PRICE */}
          <div className="mt-7 flex items-center justify-between border-t border-[#D6B45C]/40 pt-5">
            <span className="text-sm text-gray-500">Total Price</span>
            <span className="text-xl font-semibold text-[#063A5F]">
              Rs. {(product.price * quantity).toLocaleString("en-PK")}
            </span>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-[#063A5F] py-5 text-xs tracking-[3px] text-white transition duration-300 hover:bg-[#D6B45C] hover:text-[#063A5F]"
          >
            ADD TO CART
          </button>

          <a
            href="/shop"
            className="mt-6 text-center text-xs tracking-[2px] text-[#063A5F] underline underline-offset-4"
          >
            ← CONTINUE SHOPPING
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#063A5F] px-5 py-10 text-center text-white">
        <h2 className="font-serif text-2xl">Jewlina by Aneya</h2>
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
