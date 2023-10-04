import TrackNow from "@/components/TrackNow";

export default function Home() {
  return (
    <main>
      <div className="p-4 py-20">
        <h1 className="text-4.5xl font-semibold leading-[4rem]">
          <span className="bg-amber-50 pl-2">Unlock </span>
          <span className="bg-amber-50 pr-2">Savings </span>
          <br />
          <span className="bg-amber-50 pl-2">with </span>
          <span className="bg-amber-50 pr-2">PriceWise.</span>
        </h1>
        <p className="text-slate-700 my-3 text-lg px-3">
          Your Personal Amazon Price Tracker and Stock Notifier – Never Overpay
          Again and Stay Notified with <br /> Real-Time Updates.
        </p>
        <TrackNow />
      </div>

      <div></div>
    </main>
  );
}
