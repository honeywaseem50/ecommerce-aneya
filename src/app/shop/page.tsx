"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";

const collections = [
  "All Products",
  "Rings",
  "Bracelets",
  "Chains",
  "Watches",
  "Earrings",
];

export default function ShopPage() {
   const searchParams = useSearchParams();

const [category, setCategory] = useState("All Products");

useEffect(() => {
  const selectedCollection = searchParams.get("collection");

  const validCollections = [
    "All Products",
    "Rings",
    "Bracelets",
    "Chains",
    "Watches",
    "Earrings",
  ];

  if (selectedCollection && validCollections.includes(selectedCollection)) {
    setCategory(selectedCollection);
  } else {
    setCategory("All Products");
  }
}, [searchParams]);

  const filteredProducts =
    category === "All Products"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  return (
    <main className="min-h-screen bg-[#FAF7F0]">

      {/* PAGE HEADER */}
      <div className="bg-[#063A5F] py-16 text-center text-white">
        <p className="text-xs tracking-[4px] text-[#D6B45C]">
          DISCOVER JEWLINA
        </p>

        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          Our Collections
        </h1>

        <p className="mt-3 text-sm text-white/70">
          Find your perfect piece of elegance.
        </p>
      </div>

      {/* COLLECTION FILTERS */}
      <section className="mx-auto max-w-7xl px-5 py-14">

        <h2 className="mb-3 text-center font-serif text-3xl text-[#063A5F]">
          Shop By Collection
        </h2>

        <p className="mb-8 text-center text-sm text-gray-500">
          Explore our beautiful jewelry collections
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {collections.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-sm border px-6 py-3 text-xs tracking-wider transition-all duration-300 ${
                category === item
                  ? "border-[#063A5F] bg-[#063A5F] text-white"
                  : "border-[#D6B45C] bg-white text-[#063A5F] hover:bg-[#063A5F] hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PRODUCT COUNT */}
        <div className="mb-7 flex items-center justify-between border-b border-[#D6B45C]/40 pb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </p>

          <p className="text-xs font-semibold tracking-wider text-[#063A5F]">
            {category}
          </p>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">

            {filteredProducts.map((product) => (
              <div key={product.id} className="group">

                <a href={`/product/${product.id}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-4 font-serif text-lg text-[#063A5F]">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-2 font-semibold text-[#063A5F]">
                    Rs. {product.price.toLocaleString("en-PK")}
                  </p>
                </a>

                <a
                  href={`/product/${product.id}`}
                  className="mt-4 block border border-[#063A5F] py-3 text-center text-xs tracking-wider text-[#063A5F] transition hover:bg-[#063A5F] hover:text-white"
                >
                  VIEW PRODUCT
                </a>

              </div>
            ))}

          </div>
        ) : (
          <p className="py-16 text-center text-gray-500">
            No products available in this collection.
          </p>
        )}

       
      </section>

      {/* BACK TO COLLECTIONS */}
      <div className="bg-[#FAF7F0] pb-14 text-center">
        <a
          href="/#categories"
          className="inline-block border border-[#063A5F] px-8 py-4 text-xs tracking-[2px] text-[#063A5F] transition duration-300 hover:bg-[#063A5F] hover:text-white"
        >
          ← BACK TO COLLECTIONS
        </a>
      </div>

    </main>
  );
}
