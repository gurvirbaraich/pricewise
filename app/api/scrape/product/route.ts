import getAmazonProduct from "@/actions/getAmazonProduct";
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
  const productId = await getAmazonProduct(productUrl);

  return NextResponse.json({
    productId
  });
};
