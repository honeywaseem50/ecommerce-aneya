
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  products: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("jewlina_orders") || "[]"
    );

    if (savedOrders.length > 0) {
      setOrder(savedOrders[savedOrders.length - 1]);
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0]">
        Loading order details...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-5">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#063A5F]">
            No Order Found
          </h1>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-[#063A5F] px-8 py-3 text-sm text-white"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
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

      {/* SUCCESS MESSAGE */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D6B45C] text-4xl text-[#D6B45C]">
          ✓
        </div>

        <p className="mt-8 text-xs tracking-[4px] text-[#B28C36]">
          ORDER CONFIRMED
        </p>

        <h1 className="mt-4 font-serif text-4xl text-[#063A5F] sm:text-5xl">
          Thank You, {order.customer.name}!
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-500">
          Your order has been placed successfully. Thank you
          for choosing Jewlina by Aneya. We appreciate your trust!
        </p>

        <div className="mt-10 border border-[#D6B45C]/40 bg-white p-7">
          <p className="text-xs tracking-[3px] text-gray-500">
            YOUR ORDER NUMBER
          </p>

          <h2 className="mt-3 font-serif text-2xl text-[#063A5F]">
            {order.orderId}
          </h2>

          <p className="mt-3 text-xs text-gray-400">
            Please save your order number for future reference.
          </p>
        </div>

      </section>

      {/* ORDER DETAILS */}
      <section className="mx-auto grid max-w-5xl gap-8 px-5 pb-20 md:grid-cols-2">

        {/* CUSTOMER DETAILS */}
        <div className="border border-[#D6B45C]/40 bg-white p-7">
          <h2 className="font-serif text-2xl text-[#063A5F]">
            Delivery Details
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="text-xs text-gray-400">Customer Name</p>
              <p className="mt-1 text-[#063A5F]">{order.customer.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Phone Number</p>
              <p className="mt-1 text-[#063A5F]">{order.customer.phone}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">City</p>
              <p className="mt-1 text-[#063A5F]">{order.customer.city}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Delivery Address</p>
              <p className="mt-1 text-[#063A5F]">{order.customer.address}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Payment Method</p>
              <p className="mt-1 text-[#063A5F]">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="border border-[#D6B45C]/40 bg-white p-7">
          <h2 className="font-serif text-2xl text-[#063A5F]">
            Order Summary
          </h2>

          <div className="mt-6 space-y-5">
            {order.products.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-serif text-sm text-[#063A5F]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold text-[#063A5F]">
                  Rs. {(item.price * item.quantity).toLocaleString("en-PK")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-4 border-t border-gray-200 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString("en-PK")}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              <span>
                {order.delivery === 0
                  ? "FREE"
                  : `Rs. ${order.delivery.toLocaleString("en-PK")}`}
              </span>
            </div>

            <div className="flex justify-between border-t border-[#D6B45C]/40 pt-5 font-semibold">
              <span>Total Paid on Delivery</span>
              <span className="text-lg">
                Rs. {order.total.toLocaleString("en-PK")}
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* CONTINUE SHOPPING */}
      <div className="pb-20 text-center">
        <Link
          href="/shop"
          className="inline-block bg-[#063A5F] px-10 py-4 text-xs tracking-[2px] text-white transition hover:bg-[#D6B45C] hover:text-[#063A5F]"
        >
          CONTINUE SHOPPING
        </Link>
      </div>

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
