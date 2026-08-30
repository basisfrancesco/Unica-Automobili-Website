"use client";

import { useEffect, useState } from "react";

const venereViews = [
  { src: "images/venere-front.png", label: "Tre quarti anteriore" },
  { src: "images/venere-side.png", label: "Profilo" },
  { src: "images/venere-rear.png", label: "Tre quarti posteriore" },
];

const finishes = [
  { name: "Blu Notte", src: "images/configurator/blu.jpeg", color: "#12314b" },
  { name: "Verde Inglese", src: "images/configurator/verde-inglese.jpeg", color: "#24392f" },
  { name: "Arancio Bruciato", src: "images/configurator/arancione.jpeg", color: "#a94a22" },
  { name: "Giallo Modena", src: "images/configurator/giallo.jpeg", color: "#d9a514" },
  { name: "Nero Assoluto", src: "images/configurator/nero.jpeg", color: "#141414" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState(0);
  const [finish, setFinish] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "ArrowRight") setView((current) => (current + 1) % venereViews.length);
      if (event.key === "ArrowLeft") setView((current) => (current - 1 + venereViews.length) % venereViews.length);
    };
    window.addEventListener("keydown", onKey);
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("revealed"));
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <a className="brand" href="#top" aria-label="Unica Automobili, torna all'inizio">
          <img src="images/unica-logo.jpeg" alt="" />
          <span>UNICA <small>AUTOMOBILI</small></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigazione principale">
          <a href="#venere" onClick={() => setMenuOpen(false)}>Venere</a>
          <a href="#configuratore" onClick={() => setMenuOpen(false)}>Configura</a>
          <a href="#breadvan" onClick={() => setMenuOpen(false)}>Breadvan</a>
          <a href="#atelier" onClick={() => setMenuOpen(false)}>Atelier</a>
          <a className="nav-cta" href="#contatti" onClick={() => setMenuOpen(false)}>Contatti</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Apri menu"><span /><span /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" style={{ backgroundImage: "url('images/venere-front.png')" }} /><div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Automobili, una alla volta.</p>
          <h1>La forma italiana.<br /><em>Senza compromessi.</em></h1>
          <p className="intro">Reinterpretiamo icone contemporanee attraverso carrozzeria, ingegneria e sensibilità artigianale italiana.</p>
          <a className="text-link" href="#venere">Scopri Venere <span>↘</span></a>
        </div>
        <div className="hero-index"><span>01</span><i /><span>02</span></div>
        <a className="scroll-cue" href="#manifesto"><span /> Esplora</a>
      </section>

      <section className="manifesto reveal" id="manifesto" data-reveal>
        <p className="section-tag">/ Il nostro manifesto</p>
        <div><h2>Non restauriamo il passato.<br />Gli diamo un nuovo futuro.</h2><p>Unica Automobili è una carrozzeria contemporanea. Partiamo da meccaniche straordinarie per creare oggetti irripetibili, nati dalla cultura del design italiano e costruiti attorno a chi li guiderà.</p></div>
      </section>

      <section className="venere" id="venere">
        <div className="model-heading reveal" data-reveal>
          <p className="section-tag light">/ Modello 01</p>
          <img src="images/venere-logo.jpeg" alt="Venere" />
          <p>Gran Turismo, ricreata.</p>
        </div>
        <div className="viewer">
          {venereViews.map((item, index) => <img key={item.src} src={item.src} alt={`Venere — ${item.label}`} className={view === index ? "active" : ""} />)}
          <div className="viewer-controls" role="tablist" aria-label="Viste della Venere">
            {venereViews.map((item, index) => <button key={item.label} className={view === index ? "active" : ""} onClick={() => setView(index)} aria-label={`Mostra ${item.label}`}><span>0{index + 1}</span>{item.label}</button>)}
          </div>
        </div>
        <div className="venere-story reveal" data-reveal>
          <div><span className="number">4.7</span><span className="unit">V8 aspirato</span></div>
          <div className="story-copy"><p>Un motore dal carattere inconfondibile. Una nuova carrozzeria disegnata per esaltarne proporzioni, presenza e purezza.</p><p>La base meccanica della Maserati GranTurismo con V8 di origine Ferrari viene evoluta nel motore, nell’assetto e nel coinvolgimento di guida. Il cambio manuale completa un’esperienza autentica e diretta.</p></div>
        </div>
        <section className="configurator" id="configuratore">
          <div className="configurator-head reveal" data-reveal>
            <div><p className="section-tag light">/ Configuratore</p><h2>Trova il tuo<br /><em>colore.</em></h2></div>
            <p>Esplora una prima selezione di finiture sviluppate per Venere. Ogni tonalità cambia la luce, le superfici e il carattere dell’auto.</p>
          </div>
          <div className="configurator-stage reveal" data-reveal>
            <div className="configurator-images">
              {finishes.map((item, index) => <img key={item.src} src={item.src} alt={`Venere in finitura ${item.name}`} className={finish === index ? "active" : ""} />)}
              <span className="stage-label">Vista laterale</span>
              <span className="stage-count">0{finish + 1} / 0{finishes.length}</span>
            </div>
            <div className="finish-panel">
              <div className="finish-title"><span>Verniciatura esterna</span><strong>{finishes[finish].name}</strong></div>
              <div className="swatches" role="radiogroup" aria-label="Seleziona la finitura esterna">
                {finishes.map((item, index) => <button key={item.name} className={finish === index ? "active" : ""} onClick={() => setFinish(index)} role="radio" aria-checked={finish === index} aria-label={item.name}><i style={{ backgroundColor: item.color }} /><span>{item.name}</span></button>)}
              </div>
              <div className="config-summary"><span>Venere</span><span>V8 4.7 · Manuale</span><a href="#contatti">Richiedi questa configurazione ↗</a></div>
            </div>
          </div>
        </section>
        <div className="pillars">
          <article><span>01</span><h3>Disegnata da zero</h3><p>Ogni superficie è ripensata. Le proporzioni classiche incontrano un linguaggio scultoreo e contemporaneo.</p></article>
          <article><span>02</span><h3>Meccanica evoluta</h3><p>Motore, ciclistica e risposta dinamica affinati per dare nuova precisione a una grande GT italiana.</p></article>
          <article><span>03</span><h3>Manuale, per scelta</h3><p>Una conversione studiata per restituire al pilota ritmo, controllo e il piacere di ogni cambiata.</p></article>
        </div>
      </section>

      <section className="breadvan reveal" id="breadvan" data-reveal>
        <img src="images/breadvan-preview.png" alt="Anteprima del progetto Unica Breadvan coperto da un telo" /><div className="breadvan-overlay" />
        <div className="breadvan-copy"><p className="section-tag light">/ Modello 02 — In sviluppo</p><h2>BREADVAN</h2><p>Una leggenda ribelle, reinterpretata sulla base della Ferrari 812 Superfast.</p><span>La storia sta per ricominciare.</span></div>
      </section>

      <section className="atelier reveal" id="atelier" data-reveal>
        <p className="section-tag">/ L’atelier</p>
        <div className="atelier-copy"><h2>Il lusso di essere<br /><em>davvero unica.</em></h2><p>Ogni progetto nasce dal dialogo. Materiali, dettagli, taratura e carattere vengono definiti insieme al proprietario. Non esistono due Unica uguali.</p></div>
        <div className="atelier-line"><span>Design</span><i /><span>Engineering</span><i /><span>Coachbuilding</span></div>
      </section>

      <footer id="contatti">
        <div className="footer-top"><div><p className="section-tag light">/ Inizia il tuo progetto</p><h2>Creiamo qualcosa<br />di <em>irripetibile.</em></h2></div><a href="mailto:atelier@unicaautomobili.it">atelier@unicaautomobili.it <span>↗</span></a></div>
        <div className="footer-bottom"><div className="brand footer-brand"><img src="images/unica-logo.jpeg" alt="" /><span>UNICA <small>AUTOMOBILI</small></span></div><p>Carrozzeria contemporanea italiana.</p><p>© {new Date().getFullYear()} Unica Automobili</p></div>
      </footer>
    </main>
  );
}
