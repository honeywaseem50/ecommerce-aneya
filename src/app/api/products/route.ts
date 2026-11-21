
import { NextResponse } from "next/server";
import { products } from "../../../data/products";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Products fetched successfully",
      products: products,
    },
    { status: 200 }
  );
}



export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.category || !body.price || !body.image) {
    return NextResponse.json(
      { success: false, message: "All product fields are required" },
      { status: 400 }
    );
  }

  const newProduct = {
    id: Date.now(),
    name: body.name,
    category: body.category,
    price: Number(body.price),
    image: body.image,
  };

  return NextResponse.json(
    {
      success: true,
      message: "Product added successfully",
      product: newProduct,
    },
    { status: 201 }
  );
}
