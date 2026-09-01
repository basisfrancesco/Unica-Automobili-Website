"use client";

import { useEffect, useState } from "react";
import { asset } from "../lib/assets";

const finishes = [
  { name:"Blu Notte", slug:"blu", color:"#12314b", black:true },
  { name:"Verde Inglese", slug:"verde-inglese", color:"#24392f", black:true },
  { name:"Arancio Bruciato", slug:"arancione", color:"#a94a22", black:true },
  { name:"Giallo Modena", slug:"giallo", color:"#d9a514", black:true },
  { name:"Bianco Perla", slug:"bianco", color:"#e6e3dc", black:true },
  { name:"Nero Assoluto", slug:"nero", color:"#111313", black:true },
  { name:"Rosso Scuro", slug:"rosso-scuro", color:"#681d22", black:true },
];
const details = [
  { image:"/images/venere/details/front-light.png", number:"01", title:"Uno sguardo netto", copy:"Un segno luminoso sottile, incastonato in una superficie scolpita." },
  { image:"/images/venere/details/side-vent.png", number:"02", title:"Scarico laterale", copy:"Il V8 si fa sentire e diventa parte della forma: uno sfogo laterale integra funzione, suono e presenza." },
  { image:"/images/venere/details/rear-wheel.png", number:"03", title:"Tensione meccanica", copy:"Passaruota pieni e una presenza che nasce dalle proporzioni, non dall’eccesso." },
  { image:"/images/venere/details/tail-light.png", number:"04", title:"Una firma nella notte", copy:"La coda concentra tecnologia e carattere in un tratto immediatamente riconoscibile." },
];

export default function VenerePage() {
  const [finish,setFinish]=useState(0);
  const [wheels,setWheels]=useState<"silver"|"black">("silver");
  const [expanded,setExpanded]=useState(false);
  const [technical,setTechnical]=useState<"engine"|"gearbox">("engine");
  const selectedFinish=finishes[finish];
  const configuredImage=`/images/configurator/three-quarter/${wheels}/${selectedFinish.slug}.png`;

  useEffect(()=>{ const close=(event:KeyboardEvent)=>event.key==="Escape"&&setExpanded(false); window.addEventListener("keydown",close); return()=>window.removeEventListener("keydown",close); },[]);
  useEffect(()=>{ document.body.classList.toggle("menu-locked",expanded); return()=>document.body.classList.remove("menu-locked"); },[expanded]);
  return <main className="venere-page">
    <section className="venere-cinematic"><img src={asset("/images/venere-front.png")} alt="Unica Venere"/><div className="model-hero-shade"/><div className="venere-title"><p>Unica Automobili · 01</p><img src={asset("/images/venere-wordmark.png")} alt="Venere"/><span>Gran Turismo, ricreata.</span></div><a href="#essenza" className="hero-scroll"><span/>Scopri Venere</a></section>

    <section className="venere-essence" id="essenza" data-reveal><div className="vertical-note">Designed in Bergamo · Italy</div><div><p className="section-tag light">/ L’essenza</p><h1>Il fascino di una grande GT.<br/><em>La precisione di qualcosa di nuovo.</em></h1><p>Venere nasce dalla prima generazione Maserati GranTurismo e dal suo V8 4.7 aspirato costruito a Maranello. Ne conserva la voce e l’architettura, ma ne ripensa passo, massa, trasmissione e rapporto con il guidatore.</p></div></section>

    <section className="venere-program" data-reveal><article><span>01</span><strong>Passo accorciato</strong><p>Proporzioni più raccolte e una risposta più immediata ai comandi.</p></article><article><span>02</span><strong>Massa ridotta</strong><p>Ogni componente viene valutato per togliere peso dove conta davvero.</p></article><article><span>03</span><strong>Scarico laterale</strong><p>Un percorso più diretto che rende visibile — e udibile — il V8.</p></article><article><span>04</span><strong>Manuale</strong><p>Sei rapporti, leva e frizione: il gesto torna al centro della guida.</p></article></section>

    <section className="venere-profile" id="design" data-reveal><div className="profile-copy"><p className="section-tag light">/ Proporzione</p><h2>Potenza ferma.<br/><em>Anche da immobile.</em></h2><p>Cabina arretrata, cofano disteso, masse raccolte sulle ruote. Venere combina l’eleganza di una barchetta con la presenza di una moderna granturismo.</p></div><img src={asset("/images/venere-side.png")} alt="Profilo di Unica Venere"/></section>

    <section className="detail-story"><div className="detail-head" data-reveal><p className="section-tag">/ Dettagli</p><h2>Disegnata<br/>fino all’ultimo <em>millimetro.</em></h2></div><div className="detail-grid">{details.map((detail,index)=><article className={`detail-card detail-${index+1}`} key={detail.image} data-reveal><div className="detail-image"><img src={asset(detail.image)} alt={detail.title}/><span>{detail.number}</span></div><h3>{detail.title}</h3><p>{detail.copy}</p></article>)}</div></section>

    <section className="technical-section"><div className="technical-head" data-reveal><p className="section-tag light">/ Sotto la pelle</p><h2>Meno massa. Più risposta.<br/><em>Più automobile.</em></h2></div><div className="technical-stage" data-reveal><div className="technical-visual"><img className={technical==="engine"?"active":""} src={asset("/images/venere/technical/engine.png")} alt="Motore V8 di Venere"/><img className={technical==="gearbox"?"active":""} src={asset("/images/venere/technical/gearbox.png")} alt="Cambio manuale di Venere"/></div><div className="technical-copy"><div className="technical-tabs"><button className={technical==="engine"?"active":""} onClick={()=>setTechnical("engine")}>01 · Motore</button><button className={technical==="gearbox"?"active":""} onClick={()=>setTechnical("gearbox")}>02 · Trasmissione</button></div>{technical==="engine"?<div><span className="tech-number">4.7</span><h3>V8 aspirato, affinato</h3><p>Il V8 costruito a Maranello viene riportato alla sua forma migliore e affinato con interventi mirati su respirazione, risposta e scarico. La potenza cresce quanto serve; il carattere rimane il vero dato da misurare.</p></div>:<div><span className="tech-number">6</span><h3>Rapporti. Tre pedali.</h3><p>La trasmissione MC Shift nasce come cambio elettroattuato a sei rapporti in configurazione transaxle. Venere ne ripensa l’azionamento per restituire al pilota leva, frizione e controllo diretto, insieme a un autobloccante calibrato sul nuovo equilibrio della vettura.</p></div>}</div></div></section>

    <section className="front-rear"><figure data-reveal><img src={asset("/images/venere/front.png")} alt="Vista frontale Venere"/><figcaption><span>Front</span><p>Una presenza bassa, larga, priva di aggressività gratuita.</p></figcaption></figure><figure data-reveal><img src={asset("/images/venere/rear-straight.png")} alt="Vista posteriore Venere"/><figcaption><span>Rear</span><p>Volumi pieni e una firma luminosa che chiude la forma.</p></figcaption></figure></section>

    <section className="configurator-v3" id="configuratore">
      <div className="config-v3-head" data-reveal><div><p className="section-tag light">/ Atelier digitale</p><h2>Disegna la tua<br/><em>Venere.</em></h2></div><div><span>Configurazione 01</span><p>Scegli la verniciatura e la finitura dei cerchi. Ogni combinazione è visualizzata sulla nuova vista tre quarti anteriore.</p></div></div>
      <div className="config-v3-shell" data-reveal>
        <div className="config-v3-stage">
          <img key={`${selectedFinish.slug}-${wheels}`} src={asset(configuredImage)} alt={`Venere ${selectedFinish.name} con cerchi ${wheels==="silver"?"Silver":"Black"}`}/>
          <div className="config-v3-badge"><span>VENERE</span><i/>3/4 FRONT</div>
          <button className="config-expand" onClick={()=>setExpanded(true)} aria-label="Espandi immagine"><span>↗</span> Espandi</button>
          <div className="config-stage-index">0{finish+1} <span>/</span> 0{finishes.length}</div>
        </div>
        <aside className="config-controls">
          <div className="config-step"><div className="config-step-title"><span>01</span><div><small>Verniciatura</small><strong>{selectedFinish.name}</strong></div></div><div className="paint-options">{finishes.map((item,index)=>{const unavailable=wheels==="black"&&!item.black;return <button key={item.slug} disabled={unavailable} className={finish===index?"active":""} onClick={()=>setFinish(index)} aria-label={`${item.name}${unavailable?" — non ancora disponibile con cerchi Black":""}`}><i style={{backgroundColor:item.color}}/><span>{item.name}</span>{unavailable&&<small>In arrivo</small>}</button>})}</div></div>
          <div className="config-step wheel-step"><div className="config-step-title"><span>02</span><div><small>Finitura cerchi</small><strong>{wheels==="silver"?"Silver":"Black"}</strong></div></div><div className="wheel-options"><button className={wheels==="silver"?"active":""} onClick={()=>setWheels("silver")}><i className="wheel-sample silver"/><span><strong>Silver</strong><small>Alluminio satinato</small></span></button><button disabled={!selectedFinish.black} className={wheels==="black"?"active":""} onClick={()=>setWheels("black")}><i className="wheel-sample black"/><span><strong>Black</strong><small>{selectedFinish.black?"Nero tecnico":"In preparazione"}</small></span></button></div></div>
          <div className="config-recap"><div><span>La tua configurazione</span><strong>Venere · {selectedFinish.name} · {wheels==="silver"?"Silver":"Black"}</strong></div><a href={`mailto:atelier@unicaautomobili.it?subject=${encodeURIComponent(`Configurazione Venere — ${selectedFinish.name}, cerchi ${wheels}`)}`}>Condividi con l’atelier <span>↗</span></a></div>
        </aside>
      </div>
      <p className="config-note">Le immagini rappresentano una selezione preliminare. Colori, materiali e finiture saranno sviluppati insieme al cliente in atelier.</p>
      {expanded&&<div className="config-lightbox" role="dialog" aria-modal="true" aria-label="Vista ampliata della configurazione"><button onClick={()=>setExpanded(false)} aria-label="Chiudi immagine">Chiudi <span>×</span></button><img src={asset(configuredImage)} alt={`Venere ${selectedFinish.name} con cerchi ${wheels}`}/><div><span>{selectedFinish.name}</span><i/>Cerchi {wheels==="silver"?"Silver":"Black"}</div></div>}
    </section>
  </main>;
}
