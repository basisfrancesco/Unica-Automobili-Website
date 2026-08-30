import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

export const metadata: Metadata = {
  title: "Unica Automobili — Carrozzeria contemporanea italiana",
  description: "Unica Automobili reinterpreta icone italiane attraverso design, ingegneria e artigianalità. Scopri Venere e il progetto Breadvan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
