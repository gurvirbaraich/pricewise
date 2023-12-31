"use client";

import { useContext, useRef } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";

export default function TrackNow() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setAppNotification } = useContext(AppContext);

  async function initiateScrapeProductAction() {
    if (inputRef.current == null) {
      return;
    }

    // Giving feedback to the user.
    setAppNotification("Fetching Product Details...");

    // Requesting the server for the productId
    const request = axios.post("/api/scrape/product", {
      productUrl: inputRef.current.value,
    });

    const { data } = (await request) as {
      data: {
        productId: string;
      };
    };

    setAppNotification("Finished Loading Product...");
    router.push(`/product/${data.productId}`);
  }

  return (
    <div className="flex justify-between gap-3 mt-6 px-3">
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter Product URL..."
        className="border w-full rounded px-3"
        defaultValue={
          "https://www.flipkart.com/logitech-m171-wireless-optical-mouse/p/itmfgfwh4hqg9yhj"
        }
      />
      <span className="w-36 flex justify-end">
        <Button onClick={initiateScrapeProductAction} mode="default">
          Track Now
        </Button>
      </span>
    </div>
  );
}
