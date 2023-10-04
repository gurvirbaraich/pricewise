"use client";

import { useRef } from "react";
import { useRouter } from 'next/navigation'

import Button from "@/components/Button";

export default function TrackNow() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function initiateScrapeProductAction() {
    if (inputRef.current == null) {
      return;
    }

    router.push("/product/macbook")
  }

  return (
    <div className="flex justify-between gap-3 mt-6 px-3">
      <input
        type="text"
        ref={inputRef}
        className="border w-full rounded px-3"
        placeholder="Enter Product URL..."
      />
      <span className="w-36 flex justify-end">
        <Button onClick={initiateScrapeProductAction} mode="default">
          Track Now
        </Button>
      </span>
    </div>
  );
}
