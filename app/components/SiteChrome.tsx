"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset } from "../lib/assets";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  const isConfigurator = cleanPath === "/configuratore";
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const isCurrent = (path: string) => cleanPath === path;
  const modelCurrent = cleanPath === "/venere" || cleanPath === "/breadvan";

  useEffect(() => {
    setMenuOpen(false);
    setModelsOpen(false);
    const onScroll = () => {
      setScrolled(window.scrollY > 42);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && (setMenuOpen(false), setModelsOpen(false));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    onScroll();

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealItems.forEach((element, index) => element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`));
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: .12, rootMargin: "0px 0px -5% 0px" }
    );
    revealItems.forEach(element => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", menuOpen || modelsOpen);
  }, [menuOpen, modelsOpen]);

  return <>
    <div className="page-wipe" key={pathname} aria-hidden="true" />
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <header className={scrolled || menuOpen || modelsOpen ? "site-header scrolled" : "site-header"}>
      <Link className="brand" href="/" aria-label="Unica Automobili, homepage"><img src={asset("/images/unica-logo.jpeg")} alt="" /><span>UNICA <small>AUTOMOBILI</small></span></Link>
      <nav className="desktop-nav" aria-label="Navigazione principale">
        <button className={modelsOpen || modelCurrent ? "models-trigger active" : "models-trigger"} onClick={() => setModelsOpen(!modelsOpen)} aria-expanded={modelsOpen}>Modelli <i /></button>
        <Link className={isCurrent("/configuratore") ? "nav-current" : ""} href="/configuratore/">Configura</Link>
        <Link className={isCurrent("/chi-siamo") ? "nav-current" : ""} href="/chi-siamo/">Chi siamo</Link>
        <Link className={isCurrent("/atelier") ? "nav-current" : ""} href="/atelier/">Atelier</Link>
        <Link className="nav-contact" href="/atelier/#contatti">Parliamone <span>↗</span></Link>
      </nav>
      <button className={menuOpen ? "menu-button active" : "menu-button"} onClick={() => { setMenuOpen(!menuOpen); setModelsOpen(false); }} aria-expanded={menuOpen} aria-label="Apri menu"><span /><span /></button>
    </header>

    <div className={modelsOpen ? "models-dropdown open" : "models-dropdown"} aria-hidden={!modelsOpen}>
      <div className="dropdown-label"><span>La collezione</span><p>Due progetti. Una sola idea di automobile.</p></div>
      <Link className="dropdown-model" href="/venere/">
        <img className="dropdown-photo" src={asset("/images/V3/web/front-three-quarter.webp")} alt="" />
        <span>01 · Gran Turismo</span><img className="dropdown-wordmark" src={asset("/images/venere-wordmark.png")} alt="Venere" /><i>Scopri <b>↗</b></i>
      </Link>
      <Link className="dropdown-model" href="/breadvan/">
        <img className="dropdown-photo" src={asset("/images/breadvan-preview.png")} alt="" />
        <span>02 · In sviluppo</span><img className="dropdown-wordmark" src={asset("/images/breadvan-wordmark.png")} alt="Breadvan" /><i>Scopri <b>↗</b></i>
      </Link>
    </div>
    <button className={modelsOpen ? "menu-backdrop show" : "menu-backdrop"} onClick={() => setModelsOpen(false)} aria-label="Chiudi menu modelli" />

    <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
      <div className="mobile-menu-kicker">Unica Automobili · Italia</div>
      <div className="mobile-links"><Link href="/">Home</Link><Link href="/venere/"><small>01</small><img src={asset("/images/venere-wordmark.png")} alt="Venere" /></Link><Link href="/breadvan/"><small>02</small><img src={asset("/images/breadvan-wordmark.png")} alt="Breadvan" /></Link><Link href="/configuratore/">Configura Venere</Link><Link href="/chi-siamo/">Chi siamo</Link><Link href="/atelier/">Atelier</Link></div>
      <a className="mobile-contact" href="mailto:unica.automobili@gmail.com">unica.automobili@gmail.com ↗</a>
    </div>

    {children}
    {!isConfigurator && <footer id="contatti"><div className="footer-top"><div><p className="section-tag light">/ Inizia il tuo progetto</p><h2>Creiamo qualcosa<br />di <em>irripetibile.</em></h2></div><a href="mailto:unica.automobili@gmail.com">unica.automobili@gmail.com <span>↗</span></a></div><div className="footer-bottom"><div className="brand footer-brand"><img src={asset("/images/unica-logo.jpeg")} alt="" /><span>UNICA <small>AUTOMOBILI</small></span></div><p>Carrozzeria contemporanea italiana.</p><div><Link href="/chi-siamo/">Chi siamo</Link><Link href="/atelier/">Atelier</Link></div><p>© {new Date().getFullYear()} Unica Automobili</p></div></footer>}
  </>;
}
