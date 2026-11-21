
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Rings");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  async function loadProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch {
      setMessage("Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        price: Number(price),
        image,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setProducts((previous) => [...previous, data.product]);
      setName("");
      setPrice("");
      setImage("");
      setMessage("Product added successfully!");
    } else {
      setMessage(data.message || "Unable to add product.");
    }
  }

  async function editProduct(product: Product) {
    const newName = window.prompt("Enter product name:", product.name);
    if (newName === null || !newName.trim()) return;

    const newPrice = window.prompt("Enter product price:", String(product.price));
    if (newPrice === null || !newPrice.trim()) return;

    if (!Number.isFinite(Number(newPrice)) || Number(newPrice) <= 0) {
      setMessage("Please enter a valid price.");
      return;
    }

    const response = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        price: Number(newPrice),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setProducts((previous) =>
        previous.map((item) =>
          item.id === product.id ? data.product : item
        )
      );
      setMessage("Product updated successfully!");
    } else {
      setMessage(data.message || "Unable to update product.");
    }
  }

  async function deleteProduct(id: number) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      setProducts((previous) => previous.filter((item) => item.id !== id));
      setMessage("Product deleted successfully!");
    } else {
      setMessage(data.message || "Unable to delete product.");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0]">
      <header className="bg-[#063A5F] px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="font-serif text-2xl">
            Jewlina by Aneya
          </Link>
          <Link href="/admin" className="text-sm underline">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12">
        <p className="text-xs tracking-[4px] text-[#D6B45C]">
          STORE MANAGEMENT
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#063A5F]">
          Product Management
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Add, update and remove your jewelry products.
        </p>

        {message && (
          <p className="mt-6 border border-[#D6B45C] bg-white p-4 text-sm text-[#063A5F]">
            {message}
          </p>
        )}

        <form
          onSubmit={addProduct}
          className="mt-10 grid gap-4 border border-[#D6B45C]/40 bg-white p-6 sm:grid-cols-2"
        >
          <h2 className="font-serif text-2xl text-[#063A5F] sm:col-span-2">
            Add New Product
          </h2>

          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="border p-3 text-sm"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 text-sm"
          >
            <option>Rings</option>
            <option>Bracelets</option>
            <option>Watches</option>
            <option>Earrings</option>
            <option>Chains</option>
          </select>

          <input
            required
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in Rs."
            className="border p-3 text-sm"
          />

          <input
            required
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Product image URL"
            className="border p-3 text-sm"
          />

          <button
            type="submit"
            className="bg-[#063A5F] px-6 py-3 text-sm text-white hover:bg-[#D6B45C] sm:col-span-2"
          >
            ADD PRODUCT
          </button>
        </form>

        <h2 className="mt-12 font-serif text-2xl text-[#063A5F]">
          All Products ({products.length})
        </h2>

        {loading ? (
          <p className="mt-6 text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="mt-6 bg-white p-8 text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden border border-[#D6B45C]/40 bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-xs text-gray-400">
                    {product.category}
                  </p>

                  <h3 className="mt-2 font-serif text-xl text-[#063A5F]">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#063A5F]">
                    Rs. {product.price.toLocaleString("en-PK")}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => editProduct(product)}
                      className="flex-1 bg-[#063A5F] px-3 py-2 text-sm text-white"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 border border-red-400 px-3 py-2 text-sm text-red-600"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
