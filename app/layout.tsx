import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

export const metadata: Metadata = {
  title: "Unica Automobili — Carrozzeria contemporanea, Bergamo",
  description: "Nata a Bergamo dal sogno di tre appassionati, Unica Automobili crea vetture irripetibili attraverso design, ingegneria e personalizzazione totale.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
