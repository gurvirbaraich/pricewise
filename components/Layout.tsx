"use client";
import Header from "@/components/Header";
import AppProvider from "@/contexts/AppContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Header />
      {children}
    </AppProvider>
  );
}
