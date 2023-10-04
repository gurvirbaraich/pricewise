"use client";

import { useContext, useEffect, useRef } from "react";
import { AppContext } from "@/contexts/AppContext";
import gsap from "gsap";

export default function ToastNotification() {
  const toastContainerRef = useRef<HTMLDivElement>(null);
  const { appNotification, setAppNotification } = useContext(AppContext);

  const vanishToast = () => {
    setAppNotification(null);
  };

  useEffect(
    function () {
      if (!appNotification) return;

      const duration = 0.75;

      const timeline = gsap.timeline({
        defaults: {
          duration,
        },
      });

      timeline.fromTo(
        toastContainerRef.current!,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );

      const fadeOutTimeoutId = setTimeout(function () {
        timeline.fromTo(
          toastContainerRef.current!,
          {
            opacity: 1,
          },
          {
            opacity: 0,
          }
        );
      }, 3000 * duration);

      const timeoutId = setTimeout(function () {
        setAppNotification(null);
      }, 4000 * duration);

      return () => {
        clearTimeout(fadeOutTimeoutId);
        clearTimeout(timeoutId);
      }
    },
    [appNotification]
  );

  return (
    appNotification && (
      <div
        ref={toastContainerRef}
        className="absolute bg-blue-100 p-2 px-3 rounded bottom-3 right-3 z-10 shadow flex items-center gap-2 cursor-pointer"
        onClick={vanishToast}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
        <span>{appNotification}</span>
      </div>
    )
  );
}
