
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItem, getCart, clearCart } from "../../lib/cart";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lahore");

  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
    setLoaded(true);

    if (savedCart.length === 0) {
      router.replace("/shop");
    }
  }, [router]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >  3000 ? 0 : 250;
  const total = subtotal + delivery;

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      orderId: "JWL-" + Date.now(),
      customer: {
        name,
        phone,
        address,
        city,
      },
      products: cart,
      subtotal,
      delivery,
      total,
      paymentMethod: "Cash on Delivery",
      orderDate: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("jewlina_orders") || "[]"
    );

    localStorage.setItem(
      "jewlina_orders",
      JSON.stringify([...existingOrders, order])
    );

    clearCart();

    alert(
      `Thank you ${name}! Your order has been placed successfully. Order ID: ${order.orderId}`
    );

    router.push("/order-success");
  };

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0]">
        Loading checkout...
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

      {/* TITLE */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="text-xs tracking-[4px] text-[#D6B45C]">
          COMPLETE YOUR PURCHASE
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#063A5F]">
          Checkout
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Enter your delivery details to place your order.
        </p>
      </section>

      {/* CHECKOUT CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-3">

        {/* CUSTOMER FORM */}
        <div className="bg-white p-7 lg:col-span-2">
          <h2 className="font-serif text-2xl text-[#063A5F]">
            Delivery Information
          </h2>

          <form onSubmit={handlePlaceOrder} className="mt-8 space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#063A5F]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D6B45C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#063A5F]">
                Phone Number
              </label>
              <input
                type="tel"
                required
                pattern="[0-9+\-\s]{10,15}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03XXXXXXXXX"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D6B45C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#063A5F]">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#D6B45C]"
              >
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Multan">Multan</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#063A5F]">
                Complete Delivery Address
              </label>
              <textarea
                required
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House number, street, area..."
                className="w-full resize-none border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D6B45C]"
              />
            </div>

            <div className="border border-[#D6B45C]/40 bg-[#FAF7F0] p-5">
              <h3 className="font-serif text-lg text-[#063A5F]">
                Payment Method
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Cash on Delivery (COD)
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Pay when your order arrives at your doorstep.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#063A5F] py-4 text-xs font-semibold tracking-[2px] text-white transition hover:bg-[#D6B45C] hover:text-[#063A5F]"
            >
              PLACE ORDER
            </button>

            <Link
              href="/cart"
              className="block text-center text-xs text-[#063A5F] underline"
            >
              ← BACK TO CART
            </Link>

          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="h-fit border border-[#D6B45C]/40 bg-white p-7">
          <h2 className="font-serif text-2xl text-[#063A5F]">
            Your Order
          </h2>

          <div className="mt-7 space-y-5">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-serif text-sm text-[#063A5F]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#063A5F]">
                    Rs. {(item.price * item.quantity).toLocaleString("en-PK")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-4 border-t border-gray-200 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>Rs. {subtotal.toLocaleString("en-PK")}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              <span>
                {delivery === 0
                  ? "FREE"
                  : `Rs. ${delivery.toLocaleString("en-PK")}`}
              </span>
            </div>

            <div className="flex justify-between border-t border-[#D6B45C]/40 pt-5 font-semibold">
              <span>Total</span>
              <span className="text-lg">
                Rs. {total.toLocaleString("en-PK")}
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-gray-400">
            Thank you for shopping with Jewlina by Aneya.
          </p>
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
