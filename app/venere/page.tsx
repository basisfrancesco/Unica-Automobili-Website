"use client";

import { useState } from "react";
import Link from "next/link";
import { asset } from "../lib/assets";

const details = [
  { image:"/images/V3/web/front-light.webp", number:"01", title:"Uno sguardo netto", copy:"Elementi luminosi incastonati in una superficie scolpita, per uno sguardo immediatamente riconoscibile." },
  { image:"/images/V3/web/side-vent.webp", number:"02", title:"Scarico laterale", copy:"Il V8 si fa sentire e diventa parte della forma: uno sfogo laterale integra funzione, suono e presenza." },
  { image:"/images/V3/web/front-logo.webp", number:"03", title:"Una firma, da vicino", copy:"Lo scudo Unica sul cofano: un dettaglio che racconta l’identità della vettura." },
  { image:"/images/V3/web/rear-light.webp", number:"04", title:"Una firma nella notte", copy:"La coda concentra tecnologia e carattere in un tratto immediatamente riconoscibile." },
];

export default function VenerePage() {
  const [technical,setTechnical]=useState<"engine"|"gearbox">("engine");

  return <main className="venere-page">
    <section className="venere-cinematic"><img src={asset("/images/V3/web/side-dark.webp")} alt="Unica Venere"/><div className="model-hero-shade"/><div className="venere-title"><p>Unica Automobili · 01</p><img src={asset("/images/venere-wordmark.png")} alt="Venere"/><span>Gran Turismo, ricreata.</span></div><a href="#essenza" className="hero-scroll"><span/>Scopri Venere</a></section>

    <section className="venere-essence" id="essenza" data-reveal><div className="vertical-note">Designed in Bergamo · Italy</div><div><p className="section-tag light">/ L’essenza</p><h1>Il fascino di una grande GT.<br/><em>La precisione di qualcosa di nuovo.</em></h1><p>Venere nasce dalla prima generazione Maserati GranTurismo e dal suo V8 4.7 aspirato costruito a Maranello. Ne conserva la voce e l’architettura, ma ne ripensa passo, massa, trasmissione e rapporto con il guidatore.</p></div></section>

    <section className="venere-program" data-reveal><article><span>01</span><strong>Passo accorciato</strong><p>Proporzioni più raccolte e una risposta più immediata ai comandi.</p></article><article><span>02</span><strong>Massa ridotta</strong><p>Ogni componente viene valutato per togliere peso dove conta davvero.</p></article><article><span>03</span><strong>Scarico laterale</strong><p>Un percorso più diretto che rende visibile — e udibile — il V8.</p></article><article><span>04</span><strong>Manuale</strong><p>Sei rapporti, leva e frizione: il gesto torna al centro della guida.</p></article></section>

    <section className="venere-profile" id="design" data-reveal><div className="profile-copy"><p className="section-tag light">/ Proporzione</p><h2>Potenza ferma.<br/><em>Anche da immobile.</em></h2><p>Cabina arretrata, cofano disteso, masse raccolte sulle ruote. Venere combina l’eleganza di una barchetta con la presenza di una moderna granturismo.</p></div><img src={asset("/images/V3/web/side.webp")} alt="Profilo di Unica Venere"/></section>

    <section className="detail-story"><div className="detail-head" data-reveal><p className="section-tag">/ Dettagli</p><h2>Disegnata<br/>fino all’ultimo <em>millimetro.</em></h2></div><div className="detail-grid">{details.map((detail,index)=><article className={`detail-card detail-${index+1}`} key={detail.image} data-reveal><div className="detail-image"><img src={asset(detail.image)} alt={detail.title}/><span>{detail.number}</span></div><h3>{detail.title}</h3><p>{detail.copy}</p></article>)}</div></section>

    <section className="technical-section"><div className="technical-head" data-reveal><p className="section-tag light">/ Sotto la pelle</p><h2>Meno massa. Più risposta.<br/><em>Più automobile.</em></h2></div><div className="technical-stage" data-reveal><div className="technical-visual"><img className={technical==="engine"?"active":""} src={asset("/images/venere/technical/engine.png")} alt="Motore V8 di Venere"/><img className={technical==="gearbox"?"active":""} src={asset("/images/venere/technical/gearbox.png")} alt="Cambio manuale di Venere"/></div><div className="technical-copy"><div className="technical-tabs"><button className={technical==="engine"?"active":""} onClick={()=>setTechnical("engine")}>01 · Motore</button><button className={technical==="gearbox"?"active":""} onClick={()=>setTechnical("gearbox")}>02 · Trasmissione</button></div>{technical==="engine"?<div><span className="tech-number">4.7</span><h3>V8 aspirato, affinato</h3><p>Il V8 costruito a Maranello viene riportato alla sua forma migliore e affinato con interventi mirati su respirazione, risposta e scarico. La potenza cresce quanto serve; il carattere rimane il vero dato da misurare.</p></div>:<div><span className="tech-number">6</span><h3>Rapporti. Tre pedali.</h3><p>La trasmissione MC Shift nasce come cambio elettroattuato a sei rapporti in configurazione transaxle. Venere ne ripensa l’azionamento per restituire al pilota leva, frizione e controllo diretto, insieme a un autobloccante calibrato sul nuovo equilibrio della vettura.</p></div>}</div></div></section>

    <section className="front-rear"><figure data-reveal><img src={asset("/images/V3/web/front-three-quarter.webp")} alt="Venere V3, vista a tre quarti anteriore"/><figcaption><span>Front</span><p>Una presenza bassa, larga, priva di aggressività gratuita.</p></figcaption></figure><figure data-reveal><img src={asset("/images/V3/web/rear-three-quarter.webp")} alt="Venere V3, vista a tre quarti posteriore"/><figcaption><span>Rear</span><p>Volumi pieni e una firma luminosa che chiude la forma.</p></figcaption></figure></section>

    <section className="venere-config-entry" id="configuratore"><p className="section-tag light">/ Atelier digitale</p><h2>La tua interpretazione<br />di Venere.</h2><Link className="text-link" href="/configuratore/">Entra nel configuratore <span>↗</span></Link></section>
  </main>;
}

