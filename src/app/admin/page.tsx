
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
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
  status?: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("jewlina_orders") || "[]"
    );

    const updatedOrders = savedOrders.map((order: Order) => ({
      ...order,
      status: order.status || "Pending",
    }));

    setOrders(updatedOrders);
    setLoaded(true);
  }, []);

  const updateStatus = (orderId: string, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("jewlina_orders", JSON.stringify(updatedOrders));
  };

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + order.total, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0]">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0]">

      {/* HEADER */}
      <header className="bg-[#063A5F] px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <Link href="/" className="font-serif text-2xl">
              Jewlina by Aneya
            </Link>
            <p className="mt-1 text-[10px] tracking-[3px] text-[#D6B45C]">
              ADMINISTRATION PANEL
            </p>
          </div>

           <div className="flex items-center gap-5">
  <Link
    href="/admin/products"
    className="bg-[#D6B45C] px-5 py-3 text-xs font-semibold text-[#063A5F]"
  >
    MANAGE PRODUCTS
  </Link>

  <Link
    href="/"
    className="text-xs tracking-wider text-white underline"
  >
    VIEW WEBSITE
  </Link>
</div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12">

        <p className="text-xs tracking-[4px] text-[#D6B45C]">
          STORE MANAGEMENT
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#063A5F]">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Manage and monitor your customer orders.
        </p>

        {/* STATISTICS */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="border border-[#D6B45C]/40 bg-white p-6">
            <p className="text-xs text-gray-500">Total Orders</p>
            <h2 className="mt-3 font-serif text-3xl text-[#063A5F]">
              {orders.length}
            </h2>
          </div>

          <div className="border border-[#D6B45C]/40 bg-white p-6">
            <p className="text-xs text-gray-500">Pending Orders</p>
            <h2 className="mt-3 font-serif text-3xl text-[#063A5F]">
              {pendingOrders}
            </h2>
          </div>

          <div className="border border-[#D6B45C]/40 bg-white p-6">
            <p className="text-xs text-gray-500">Delivered Orders</p>
            <h2 className="mt-3 font-serif text-3xl text-[#063A5F]">
              {deliveredOrders}
            </h2>
          </div>

          <div className="border border-[#D6B45C]/40 bg-white p-6">
            <p className="text-xs text-gray-500">Total Revenue</p>
            <h2 className="mt-3 font-serif text-2xl text-[#063A5F]">
              Rs. {totalRevenue.toLocaleString("en-PK")}
            </h2>
          </div>

        </div>

        {/* ORDERS */}
        <div className="mt-12">

          <h2 className="font-serif text-2xl text-[#063A5F]">
            Customer Orders
          </h2>

          {orders.length === 0 ? (
            <div className="mt-6 border border-[#D6B45C]/40 bg-white px-5 py-16 text-center">
              <h3 className="font-serif text-2xl text-[#063A5F]">
                No Orders Yet
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                Customer orders will appear here.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block bg-[#063A5F] px-8 py-3 text-xs text-white"
              >
                EXPLORE SHOP
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-6">

              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="border border-[#D6B45C]/40 bg-white p-6"
                >

                  <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row">

                    <div>
                      <p className="text-xs text-gray-400">ORDER ID</p>
                      <h3 className="mt-2 font-semibold text-[#063A5F]">
                        {order.orderId}
                      </h3>
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">ORDER STATUS</p>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.orderId, e.target.value)
                        }
                        className="mt-2 border border-[#D6B45C] bg-[#FAF7F0] px-4 py-2 text-sm text-[#063A5F] outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                  </div>

                  {/* CUSTOMER */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">

                    <div>
                      <p className="text-xs text-gray-400">CUSTOMER</p>
                      <p className="mt-2 text-sm font-semibold text-[#063A5F]">
                        {order.customer.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {order.customer.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">DELIVERY ADDRESS</p>
                      <p className="mt-2 text-sm text-[#063A5F]">
                        {order.customer.address}, {order.customer.city}
                      </p>
                    </div>

                  </div>

                  {/* PRODUCTS */}
                  <div className="mt-7 border-t border-gray-200 pt-5">

                    <p className="text-xs tracking-wider text-gray-400">
                      ORDERED PRODUCTS
                    </p>

                    <div className="mt-4 space-y-4">

                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 object-cover"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#063A5F]">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Quantity: {product.quantity}
                            </p>
                          </div>

                          <p className="text-sm text-[#063A5F]">
                            Rs. {(product.price * product.quantity).toLocaleString("en-PK")}
                          </p>
                        </div>
                      ))}

                    </div>
                  </div>

                  {/* PAYMENT */}
                  <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-[#D6B45C]/40 pt-5">

                    <div>
                      <p className="text-xs text-gray-400">
                        PAYMENT METHOD
                      </p>
                      <p className="mt-2 text-sm text-[#063A5F]">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">ORDER TOTAL</p>
                      <p className="mt-2 font-semibold text-[#063A5F]">
                        Rs. {order.total.toLocaleString("en-PK")}
                      </p>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#063A5F] px-5 py-8 text-center text-white">
        <p className="font-serif text-xl">Jewlina by Aneya</p>
        <p className="mt-3 text-xs text-white/50">
          © 2026 Jewlina by Aneya. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
