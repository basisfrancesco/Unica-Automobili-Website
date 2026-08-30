import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unica Automobili — Carrozzeria contemporanea italiana",
  description: "Unica Automobili reinterpreta icone italiane attraverso design, ingegneria e artigianalità. Scopri Venere e il progetto Breadvan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
