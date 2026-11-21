
import { NextResponse } from "next/server";

const orders: any[] = [];

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Orders fetched successfully",
      orders,
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.customerName ||
      !body.phone ||
      !body.address ||
      !body.total
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required order details are missing",
        },
        { status: 400 }
      );
    }

    const newOrder = {
      id: Date.now(),
      orderId: "JWL-" + Date.now(),
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      total: Number(body.total),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request data",
      },
      { status: 400 }
    );
  }
}
