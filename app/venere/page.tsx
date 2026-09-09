"use client";

import { useState } from "react";
import Link from "next/link";
import { asset } from "../lib/assets";
import "./venere.css";

const perspectives = [
  { image: "front-three-quarter", name: "Tre quarti anteriore", title: "Il primo incontro.", copy: "Bassa, larga, raccolta. La presenza di Venere nasce dalle proporzioni." },
  { image: "side", name: "Profilo", title: "Una linea, nessuna interruzione.", copy: "Il cofano disteso, la cabina arretrata, la coda compatta. Ogni volume trova il proprio equilibrio." },
  { image: "rear-three-quarter", name: "Tre quarti posteriore", title: "L’ultima impressione.", copy: "I rialzi dietro i sedili accompagnano lo sguardo verso la firma luminosa della coda." },
];
const details = [
  { image: "front-light", name: "Lo sguardo", title: "La luce prende forma.", copy: "Elementi luminosi racchiusi in una superficie scolpita. Un dettaglio tecnico che diventa espressione.", alt: "Dettaglio del faro anteriore della Venere blu" },
  { image: "side-vent", name: "La voce", title: "Il suono ha una direzione.", copy: "Due terminali laterali, incastonati nel carbonio. Lo scarico entra nel disegno della vettura e ne dichiara il carattere.", alt: "Scarichi laterali e ruota anteriore della Venere" },
  { image: "rear-light", name: "La firma", title: "Un cerchio di luce.", copy: "Il fanale posteriore emerge dai volumi della coda: una firma essenziale, riconoscibile anche da lontano.", alt: "Dettaglio del fanale circolare posteriore della Venere" },
];
const photo = (name: string) => asset(`/images/V3/web/${name}.webp`);

export default function VenerePage() {
  const [perspective, setPerspective] = useState(0);
  const [detail, setDetail] = useState(0);
  const [technical, setTechnical] = useState<"engine" | "gearbox">("engine");
  const current = perspectives[perspective];
  const selected = details[detail];
  return <main className="v-story">
    <section className="v-opening" aria-labelledby="venere-heading">
      <div className="v-opening-copy"><p className="v-kicker">Unica Automobili / 01</p><h1 id="venere-heading">Venere<span>La forma del desiderio.</span></h1><p>Un’anima italiana.<br/>Una nuova libertà.</p></div>
      <img className="v-opening-car" src={photo("front-three-quarter")} alt="Venere, vista completa a tre quarti anteriore" fetchPriority="high" width="2200" height="1228"/>
      <div className="v-opening-bottom"><a href="#essenza">Scopri la sua storia <span aria-hidden="true">↓</span></a><span>V8 aspirato · Barchetta · Unica</span></div>
      <span className="v-outline" aria-hidden="true">VENERE</span>
    </section>

    <section className="v-origin" id="essenza">
      <div className="v-origin-art" data-reveal><img src={photo("front-light")} alt="La luce anteriore incastonata nella carrozzeria blu" loading="lazy"/><span className="v-photo-note">01 / Disegnata per essere riconosciuta</span><img className="v-origin-seal" src={photo("front-logo")} alt="Scudo Unica sulla carrozzeria metallizzata" loading="lazy"/></div>
      <div className="v-origin-copy" data-reveal><p className="v-kicker">L’essenza / Da Bergamo, Italia</p><h2>La memoria<br/>di una GT.<br/><em>L’istinto di<br/>qualcosa di nuovo.</em></h2><p>Venere nasce dalla prima generazione Maserati GranTurismo. Ne conserva il V8 4.7 aspirato costruito a Maranello e ne reinterpreta proporzioni, massa e rapporto con chi guida.</p><div className="v-origin-foot"><span>Passo accorciato.<br/>Masse raccolte.</span><span>Sei rapporti.<br/>Tre pedali.</span></div></div>
    </section>

    <section className="v-perspectives" id="design" aria-labelledby="perspective-heading">
      <header data-reveal><p className="v-kicker">La forma / Cambia punto di vista</p><h2 id="perspective-heading">Si riconosce.<br/><em>Da ogni angolo.</em></h2></header>
      <div className="v-perspective-controls" aria-label="Scegli la vista di Venere">{perspectives.map((item,i)=><button type="button" key={item.image} aria-pressed={perspective===i} onClick={()=>setPerspective(i)}><span>0{i+1}</span>{item.name}</button>)}</div>
      <div className="v-car-turntable">{perspectives.map((item,i)=><img key={item.image} className={i===perspective?"is-current":""} src={photo(item.image)} alt={i===perspective?item.name:""} aria-hidden={i!==perspective} loading="lazy" width="2200" height="1228"/>)}</div>
      <div className="v-view-caption" aria-live="polite"><span className="v-view-number">0{perspective+1}<small>/ 03</small></span><h3>{current.title}</h3><p>{current.copy}</p></div>
    </section>

    <section className="v-detail-experience" aria-labelledby="detail-heading">
      <div className="v-detail-copy" data-reveal><p className="v-kicker">Avvicinati / I dettagli</p><h2 id="detail-heading">Il carattere<br/>è nelle <em>sfumature.</em></h2><div className="v-detail-controls" aria-label="Esplora i dettagli">{details.map((item,i)=><button type="button" key={item.image} onClick={()=>setDetail(i)} aria-pressed={detail===i}><span>0{i+1}</span>{item.name}<span aria-hidden="true">↗</span></button>)}</div><div className="v-detail-description" aria-live="polite"><h3>{selected.title}</h3><p>{selected.copy}</p></div></div>
      <div className="v-detail-art"><span className="v-detail-number" aria-hidden="true">0{detail+1}</span>{details.map((item,i)=><img key={item.image} className={i===detail?"is-current":""} src={photo(item.image)} alt={i===detail?item.alt:""} aria-hidden={i!==detail} loading="lazy"/>)}</div>
      <span className="v-edge-note" aria-hidden="true">Design · Ingegneria · Materia</span>
    </section>

    <section className="v-mechanics">
      <div className="v-mechanics-heading" data-reveal><p className="v-kicker">Sotto la pelle / Il gesto di guidare</p><h2>Prima di tutto,<br/><em>un’automobile.</em></h2></div>
      <div className="v-mechanics-layout"><div className="v-mechanics-image"><img src={asset(technical==="engine"?"/images/venere/technical/engine.png":"/images/venere/technical/gearbox.png")} alt={technical==="engine"?"Motore V8 di Venere":"Comando del cambio manuale"} loading="lazy"/></div><div className="v-mechanics-copy"><div className="v-mechanics-controls" aria-label="Esplora la meccanica"><button type="button" aria-pressed={technical==="engine"} onClick={()=>setTechnical("engine")}>01 / Motore</button><button type="button" aria-pressed={technical==="gearbox"} onClick={()=>setTechnical("gearbox")}>02 / Trasmissione</button></div><div aria-live="polite"><span className="v-mechanical-number">{technical==="engine"?"4.7":"6"}<small>{technical==="engine"?"V8 aspirato":"rapporti"}</small></span><h3>{technical==="engine"?"Una voce da conservare.":"Il controllo torna nelle mani."}</h3><p>{technical==="engine"?"Il V8 viene riportato alla sua forma migliore e affinato con interventi su respirazione, risposta e scarico. La potenza cresce quanto serve; il carattere rimane il vero dato da misurare.":"La trasmissione MC Shift a sei rapporti, in configurazione transaxle, viene ripensata nell’azionamento per restituire al pilota leva, frizione e controllo diretto."}</p></div></div></div>
    </section>

    <section className="v-signature-story">
      <div className="v-signature-heading" data-reveal><p className="v-kicker">L’identità / Due segni, una storia</p><h2>Unica, nel nome.<br/><em>Venere, nell’anima.</em></h2></div>
      <figure className="v-signature-front" data-reveal><img src={photo("front-logo")} alt="Lo scudo Unica sul cofano" loading="lazy"/><figcaption>La firma di chi la immagina.</figcaption></figure>
      <figure className="v-signature-rear" data-reveal><img src={photo("rear-logo")} alt="Il nome Venere sulla coda" loading="lazy"/><figcaption>Il nome che ne racconta la forma.</figcaption></figure>
      <p className="v-signature-note">Superfici, riflessi, piccoli segni.<br/>La stessa cura, a ogni distanza.</p>
    </section>

    <section className="v-finale" id="configuratore"><img src={photo("rear-three-quarter")} alt="Venere vista da dietro a tre quarti" loading="lazy" width="2200" height="1228"/><div><p className="v-kicker">Il prossimo capitolo / Il tuo</p><h2>Immaginala.<br/><em>Falla tua.</em></h2><Link href="/configuratore/">Configura la tua Venere <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
