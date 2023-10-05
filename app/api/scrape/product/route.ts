import getFlipkartProduct from "@/actions/getFlipkartProduct";
import { connectToDatabase } from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { productUrl } = (await request.json()) as {
    productUrl?: string;
  };
  
  if (!productUrl) {
    return NextResponse.json({
      productId: null,
      error: "Invalid URL provided!",
    });
  }
  
  connectToDatabase();
  const productId = await getFlipkartProduct(productUrl);

  return NextResponse.json({
    productId
  });
};
