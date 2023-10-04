import Link from "next/link";
import Button from "@/components/Button";

export default function Header() {
  return (
    <header className="bg-slate-950 items-center p-6 w-full flex flex-row justify-between">
      <div className="text-xl">
        <Link href="/">
          <span className="text-amber-300">Price</span>
          <span className="text-white">Wise</span>
        </Link>
      </div>

      <div className="flex gap-4 items-center text-gray-200">
        <Link href={"#"}>Pricing</Link>
        <Link href={"#"}>
          <Button mode="default">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
}
