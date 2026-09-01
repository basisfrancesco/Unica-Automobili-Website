"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "../lib/assets";

const slides = [
  { image: "/images/venere-front.png", eyebrow: "Unica Venere", title: <>La forma italiana.<br/><em>Senza compromessi.</em></>, link: "/venere/" },
  { image: "/images/venere/details/front-light.png", eyebrow: "Design · Ingegneria · Materia", title: <>Un’icona, vista<br/><em>con occhi nuovi.</em></>, link: "/venere/#design" },
  { image: "/images/atelier/atelier.png", eyebrow: "Carrozzeria contemporanea", title: <>Automobili costruite<br/><em>attorno a te.</em></>, link: "/atelier/" },
];

export default function HomeExperience() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive(value => (value + 1) % slides.length), 6500); return () => clearInterval(timer); }, []);
  return <>
    <section className="cinematic-hero">
      <div className="hero-slides">{slides.map((slide,index)=><img key={slide.image} className={active===index?"active":""} src={asset(slide.image)} alt="" />)}</div><div className="cinematic-shade" />
      <div className="cinematic-copy" key={active}><p>{slides[active].eyebrow}</p><h1>{slides[active].title}</h1><Link href={slides[active].link}>Entra nella storia <span>↗</span></Link></div>
      <div className="hero-pager">{slides.map((slide,index)=><button key={slide.image} className={active===index?"active":""} onClick={()=>setActive(index)} aria-label={`Scena ${index+1}`}><span>0{index+1}</span><i /></button>)}</div>
      <a href="#vision" className="hero-scroll"><span />Scorri per scoprire</a>
    </section>

    <section className="vision-section" id="vision" data-reveal><div className="vision-index">01 / 04</div><div><p className="section-tag">/ Nata a Bergamo</p><h2>Le grandi automobili<br/>non si limitano a muoversi.<br/><em>Muovono qualcosa.</em></h2><div className="vision-copy"><p>Unica Automobili nasce dal sogno condiviso di tre ragazzi e da una passione che non ha mai accettato automobili anonime. Reinterpretiamo meccaniche straordinarie per trasformarle in qualcosa di personale, irripetibile, davvero unico.</p><Link href="/chi-siamo/">La nostra storia <span>↗</span></Link></div></div></section>

    <section className="collection-section" data-reveal><div className="collection-head"><p className="section-tag light">/ La collezione</p><h2>Due anime.<br/><em>Una firma.</em></h2></div><div className="collection-grid">
      <Link className="collection-card" href="/venere/"><img src={asset("/images/venere-side.png")} alt="Venere"/><div className="collection-shade"/><div className="collection-meta"><span>01 · Grand Tourer</span><img src={asset("/images/venere-wordmark.png")} alt="Venere"/><p>V8 aspirato · Cambio manuale</p><i>Esplora il modello ↗</i></div></Link>
      <Link className="collection-card" href="/breadvan/"><img src={asset("/images/breadvan-preview.png")} alt="Breadvan"/><div className="collection-shade"/><div className="collection-meta"><span>02 · Project</span><img src={asset("/images/breadvan-wordmark.png")} alt="Breadvan"/><p>V12 · In sviluppo</p><i>Scopri il progetto ↗</i></div></Link>
    </div></section>

    <section className="craft-teaser" data-reveal><img src={asset("/images/atelier/atelier.png")} alt="L’atelier Unica Automobili"/><div className="craft-shade"/><div className="craft-copy"><p className="section-tag light">/ Porte aperte</p><h2>Dove l’idea<br/>diventa <em>materia.</em></h2><p>Il cliente non osserva il progetto da lontano: entra nell’atelier, incontra chi costruisce la sua automobile e può seguirne ogni passaggio.</p><Link href="/atelier/">Vivi l’atelier ↗</Link></div></section>
  </>;
}
