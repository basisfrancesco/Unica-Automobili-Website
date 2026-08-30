"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "../lib/assets";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  return <>
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <Link className="brand" href="/" aria-label="Unica Automobili, homepage">
        <img src={asset("/images/unica-logo.jpeg")} alt="" />
        <span>UNICA <small>AUTOMOBILI</small></span>
      </Link>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigazione principale">
        <Link href="/venere/" onClick={() => setMenuOpen(false)}>Venere</Link>
        <Link href="/venere/#configuratore" onClick={() => setMenuOpen(false)}>Configura</Link>
        <Link href="/breadvan/" onClick={() => setMenuOpen(false)}>Breadvan</Link>
        <Link href="/atelier/" onClick={() => setMenuOpen(false)}>Atelier</Link>
        <Link className="nav-cta" href="/atelier/#contatti" onClick={() => setMenuOpen(false)}>Contatti</Link>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Apri menu"><span /><span /></button>
    </header>
    {children}
    <footer id="contatti">
      <div className="footer-top"><div><p className="section-tag light">/ Inizia il tuo progetto</p><h2>Creiamo qualcosa<br />di <em>irripetibile.</em></h2></div><a href="mailto:atelier@unicaautomobili.it">atelier@unicaautomobili.it <span>↗</span></a></div>
      <div className="footer-bottom"><div className="brand footer-brand"><img src={asset("/images/unica-logo.jpeg")} alt="" /><span>UNICA <small>AUTOMOBILI</small></span></div><p>Carrozzeria contemporanea italiana.</p><p>© {new Date().getFullYear()} Unica Automobili</p></div>
    </footer>
  </>;
}
