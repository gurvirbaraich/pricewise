"use client";
import { cn } from "@/utils/cn";

export default function Button({
  mode,
  onClick,
  children,
}: {
  onClick?: () => any;
  children: React.ReactNode;
  mode: "default" | "outline";
}) {
  return (
    <button
      onClick={onClick ?? (() => {})}
      className={cn(
        "bg-amber-200 w-full text-slate-950 cursor-pointer p-2 rounded",
        mode == "outline" &&
          "border border-amber-200 bg-transparent text-amber-200 px-4 rounded-none"
      )}
    >
      {children}
    </button>
  );
}
