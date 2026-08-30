import Link from "next/link";
import { asset } from "./lib/assets";

export default function Home() {
  return <main>
    <section className="hero home-hero" id="top">
      <div className="hero-image" style={{ backgroundImage: `url('${asset("/images/venere-front.png")}')` }} /><div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow">Automobili, una alla volta.</p><h1>La forma italiana.<br /><em>Senza compromessi.</em></h1><p className="intro">Reinterpretiamo icone contemporanee attraverso carrozzeria, ingegneria e sensibilità artigianale italiana.</p><Link className="text-link" href="/venere/">Scopri Venere <span>↘</span></Link></div>
      <a className="scroll-cue" href="#modelli"><span /> Esplora</a>
    </section>

    <section className="manifesto compact-manifesto">
      <p className="section-tag">/ Il nostro manifesto</p>
      <div><h2>Non restauriamo il passato.<br />Gli diamo un nuovo futuro.</h2><p>Unica Automobili è una carrozzeria contemporanea. Partiamo da meccaniche straordinarie per creare oggetti irripetibili, nati dalla cultura del design italiano.</p><Link className="dark-link" href="/atelier/">Conosci l’atelier ↗</Link></div>
    </section>

    <section className="models-index" id="modelli">
      <article className="model-card venere-card">
        <img className="model-card-bg" src={asset("/images/venere-side.png")} alt="Venere vista laterale" />
        <div className="model-card-shade" />
        <div className="model-card-content"><span>/ 01</span><img className="wordmark venere-mark" src={asset("/images/venere-wordmark.png")} alt="Venere" /><p>Gran Turismo, ricreata.</p><Link href="/venere/">Esplora il modello ↗</Link></div>
      </article>
      <article className="model-card breadvan-card">
        <img className="model-card-bg" src={asset("/images/breadvan-preview.png")} alt="Anteprima Breadvan" />
        <div className="model-card-shade" />
        <div className="model-card-content"><span>/ 02 — In sviluppo</span><img className="wordmark breadvan-mark light-mark" src={asset("/images/breadvan-wordmark.png")} alt="Breadvan" /><p>La storia sta per ricominciare.</p><Link href="/breadvan/">Scopri il progetto ↗</Link></div>
      </article>
    </section>

    <section className="home-atelier"><p className="section-tag">/ Su misura</p><h2>Il lusso di essere<br /><em>davvero unica.</em></h2><Link className="dark-link" href="/atelier/">Entra nell’atelier ↗</Link></section>
  </main>;
}
