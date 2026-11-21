 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, addToCart } from "../lib/cart";
import { products as allProducts } from "../data/products";

const categories = [
  {
    name: "Rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85",
  },
  {
    name: "Bracelets",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=85",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=85",
  },
  {
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&q=85",
  },
  {
    name: "Chains",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85",
  },
];

const bestSellerIds = [1, 2, 3, 4];

const bestSellerTags: Record<number, string> = {
  1: "BEST SELLER",
  2: "POPULAR",
  3: "NEW ARRIVAL",
  4: "TRENDING",
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const bestSellers = bestSellerIds
    .map((id) => allProducts.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  const updateCartCount = () => {
    const cart = getCart();

    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("focus", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("focus", updateCartCount);
    };
  }, []);

  const handleAddToCart = (product: (typeof allProducts)[number]) => {
    addToCart(product, 1);
    updateCartCount();
  };

  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#063A5F]">

      {/* Announcement Bar */}
      <div className="bg-[#063A5F] px-4 py-2.5 text-center text-xs tracking-[2px] text-white sm:text-sm">
        FREE DELIVERY ON ORDERS ABOVE RS. 3,000
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e9dfca] bg-[#FAF7F0]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6B45C] text-2xl text-[#D6B45C]">
              J
            </div>

            <div>
              <h1 className="font-serif text-xl font-semibold tracking-[2px] sm:text-2xl">
                JEWLINA
              </h1>
              <p className="text-center text-[9px] tracking-[4px] text-[#B28C36]">
                BY ANEYA
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
            <a href="#" className="transition hover:text-[#C39B40]">Home</a>
            <a href="#shop" className="transition hover:text-[#C39B40]">Shop All</a>
            <a href="#categories" className="transition hover:text-[#C39B40]">Collections</a>
            <a href="#about" className="transition hover:text-[#C39B40]">About Us</a>
            <a href="#contact" className="transition hover:text-[#C39B40]">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="transition hover:text-[#D6B45C]">
              <SearchIcon />
            </button>

            <button aria-label="Account" className="hidden transition hover:text-[#D6B45C] sm:block">
              <UserIcon />
            </button>

            <Link href="/cart" aria-label="Shopping bag" className="relative transition hover:text-[#D6B45C]">
              <BagIcon />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D6B45C] text-[10px] text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#063A5F]">
        <div className="grid min-h-[540px] md:grid-cols-2">

          <div className="flex flex-col justify-center px-8 py-16 text-center md:px-16 md:text-left lg:px-24">
            <p className="mb-5 text-xs font-medium tracking-[5px] text-[#D6B45C]">
              ELEGANCE IN EVERY DETAIL
            </p>

            <h2 className="font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
              Beauty That
              <br />
              <span className="italic text-[#D6B45C]">Lasts Forever.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/75 md:mx-0">
              Discover timeless jewelry pieces designed to make
              every moment special. Elegance, beauty and charm
              in every detail.
            </p>

            <div className="mt-9 flex justify-center md:justify-start">
              <a href="#shop" className="border border-[#D6B45C] bg-[#D6B45C] px-9 py-4 text-xs font-semibold tracking-[2px] text-[#063A5F] transition hover:bg-transparent hover:text-[#D6B45C]">
                EXPLORE COLLECTION
              </a>
            </div>

            <p className="mt-12 font-serif text-sm italic text-[#D6B45C]">
              Made to shine. Made for you.
            </p>
          </div>

          <div className="relative min-h-[350px] md:min-h-[540px]">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=90"
              alt="Elegant golden jewelry collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#063A5F]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 text-center md:grid-cols-4">
        {[
          ["✧", "Elegant Designs", "Beautiful everyday pieces"],
          ["◇", "Premium Quality", "Carefully selected jewelry"],
          ["♡", "Made With Love", "Style for every occasion"],
          ["⌂", "Home Delivery", "Delivered to your doorstep"],
        ].map(([icon, title, desc]) => (
          <div key={title}>
            <div className="mb-2 text-2xl text-[#C49A3A]">{icon}</div>
            <h3 className="font-serif text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </section>

      {/* Collections */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[4px] text-[#B28C36]">EXPLORE OUR WORLD</p>
          <h2 className="mt-3 font-serif text-4xl">Shop By Collection</h2>
          <p className="mt-3 text-sm text-gray-500">
            Find something beautiful for every moment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              href={`/shop?collection=${encodeURIComponent(category.name)}`}
              key={category.name}
              className="group text-center"
            >
              <div className="aspect-[4/5] overflow-hidden bg-white">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-4 font-serif text-lg transition group-hover:text-[#C49B40]">
                {category.name}
              </h3>

              <p className="mt-1 text-[10px] tracking-[2px] text-gray-500">
                EXPLORE COLLECTION
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers - Connected to Real Products */}
      <section id="shop" className="bg-white px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-xs tracking-[4px] text-[#B28C36]">
                HANDPICKED FOR YOU
              </p>
              <h2 className="mt-2 font-serif text-4xl">
                Our Best Sellers
              </h2>
            </div>

            <Link href="/shop" className="border-b border-[#D6B45C] pb-1 text-xs tracking-[2px]">
              VIEW ALL PRODUCTS →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {bestSellers.map((product) => (
              <div key={product.id} className="group">

                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF7F0]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 bg-[#063A5F] px-3 py-2 text-[9px] tracking-wider text-white">
                      {bestSellerTags[product.id]}
                    </span>
                  </div>
                </Link>

                <div className="pt-4">
                  <p className="text-[10px] tracking-[2px] text-[#B28C36]">
                    {product.category.toUpperCase()}
                  </p>

                  <Link href={`/product/${product.id}`}>
                    <h3 className="mt-2 font-serif text-base hover:text-[#B28C36]">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="mt-2 text-sm font-semibold">
                    Rs. {product.price.toLocaleString("en-PK")}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 block w-full border border-[#063A5F] py-3 text-center text-[10px] font-semibold tracking-[2px] transition hover:bg-[#063A5F] hover:text-white"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 lg:px-10">
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1000&q=85"
            alt="Luxury jewelry"
            className="h-[420px] w-full object-cover"
          />
        </div>

        <div className="py-5 md:px-8">
          <p className="text-xs tracking-[4px] text-[#B28C36]">OUR STORY</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight">
            A Little Luxury,
            <br />
            A Lot of Love.
          </h2>

          <p className="mt-6 text-sm leading-8 text-gray-600">
            At Jewlina by Aneya, we believe every piece of jewelry
            tells a story. Our collection brings together timeless
            elegance and everyday beauty, helping you express
            your unique style with confidence.
          </p>

          <a href="#shop" className="mt-8 inline-block border-b border-[#D6B45C] pb-2 text-xs tracking-[2px]">
            DISCOVER JEWLINA →
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#063A5F] px-6 py-16 text-center text-white">
        <p className="text-xs tracking-[4px] text-[#D6B45C]">STAY IN THE LOOP</p>

        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
          A Little Something Special
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">
          Be the first to discover our latest arrivals and exclusive collections.
        </p>

        <div className="mx-auto mt-7 flex max-w-md gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-[#063A5F] outline-none"
          />

          <button className="bg-[#D6B45C] px-5 text-xs font-semibold tracking-wider text-[#063A5F] transition hover:bg-white">
            JOIN US
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#042D49] px-6 pb-6 pt-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-4">

          <div>
            <h2 className="font-serif text-2xl tracking-[3px]">JEWLINA</h2>
            <p className="mt-1 text-[10px] tracking-[4px] text-[#D6B45C]">BY ANEYA</p>
            <p className="mt-5 max-w-xs text-xs leading-7 text-white/60">
              Bringing beauty, elegance and timeless charm to your everyday style.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg text-[#D6B45C]">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3 text-xs text-white/70">
              <a href="#">Home</a>
              <a href="#shop">Shop All</a>
              <a href="#categories">Collections</a>
              <a href="#about">About Us</a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-[#D6B45C]">Customer Care</h3>
            <div className="mt-5 flex flex-col gap-3 text-xs text-white/70">
              <a href="#contact">Contact Us</a>
              <a href="#contact">Shipping Information</a>
              <a href="#contact">Return Policy</a>
              <a href="#contact">FAQs</a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-[#D6B45C]">Get In Touch</h3>
            <p className="mt-5 text-xs leading-7 text-white/70">
              Instagram: @jewlina_by_aneya
              <br />
              DM to Order Now
              <br />
              Pakistan
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-6 text-center text-[10px] tracking-wider text-white/50">
          © 2026 JEWLINA BY ANEYA. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </main>
  );
}
