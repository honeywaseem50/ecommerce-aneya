
import { NextResponse } from "next/server";
import { products } from "../../../../data/products";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  const updatedProduct = {
    ...product,
    name: body.name ?? product.name,
    category: body.category ?? product.category,
    price: body.price !== undefined ? Number(body.price) : product.price,
    image: body.image ?? product.image,
  };

  return NextResponse.json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
}
