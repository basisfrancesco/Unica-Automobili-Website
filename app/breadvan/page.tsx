import Link from "next/link";
import { asset } from "../lib/assets";

export default function BreadvanPage() {
  return <main className="model-page breadvan-page">
    <section className="model-hero breadvan-detail-hero">
      <img className="model-hero-bg" src={asset("/images/breadvan-preview.png")} alt="Progetto Breadvan coperto da un telo" /><div className="model-hero-shade" />
      <div className="model-hero-title"><p className="section-tag light">/ Unica Automobili — 02 · In sviluppo</p><img className="wordmark breadvan-page-mark light-mark" src={asset("/images/breadvan-wordmark.png")} alt="Breadvan" /><p>La storia sta per ricominciare.</p></div>
    </section>
    <section className="project-intro"><p className="section-tag">/ Il progetto</p><div><h1>Una leggenda ribelle.<br /><em>Un nuovo capitolo.</em></h1><p>La 250 GT SWB Breadvan del 1962, realizzata da Piero Drogo, è una delle più audaci interpretazioni della scuola italiana. Unica ne raccoglie lo spirito e lo porta nel presente sulla base della Ferrari 812 Superfast.</p></div></section>
    <section className="breadvan-facts"><article><span>Base</span><strong>812 Superfast</strong></article><article><span>Architettura</span><strong>V12 anteriore</strong></article><article><span>Stato</span><strong>In sviluppo</strong></article></section>
    <section className="coming-next"><p className="section-tag light">/ Work in progress</p><h2>Forma, funzione,<br /><em>provocazione.</em></h2><p>Il progetto verrà svelato progressivamente. Seguici mentre una nuova Breadvan prende forma.</p><Link className="text-link" href="/atelier/#contatti">Parla con l’atelier <span>↗</span></Link></section>
  </main>;
}
