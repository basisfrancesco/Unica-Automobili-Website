import Link from "next/link";
import { asset } from "../lib/assets";

export default function ChiSiamoPage() {
  return <main className="about-page">
    <section className="about-hero"><img src={asset("/images/atelier/atelier.png")} alt="Atelier Unica Automobili"/><div className="about-shade"/><div className="about-title"><p>Unica Automobili · Italia</p><h1>Non costruiamo<br/>automobili per tutti.</h1><span>Le costruiamo per qualcuno.</span></div></section>
    <section className="about-manifesto" data-reveal><p className="section-tag">/ Chi siamo</p><div><h2>Una carrozzeria italiana<br/><em>per il nostro tempo.</em></h2><p className="about-lead">Unica nasce da un’idea semplice: le automobili più affascinanti non sono prodotti anonimi, ma espressioni personali.</p><div className="about-columns"><p>Riprendiamo la tradizione dei grandi carrozzieri italiani, quando una meccanica eccezionale poteva ricevere una forma completamente nuova. Non replichiamo il passato: ne continuiamo il metodo.</p><p>Design, ingegneria e artigianalità lavorano insieme fin dall’inizio. Ogni decisione deve migliorare l’insieme, dall’impatto visivo alla sensazione di una cambiata.</p></div></div></section>
    <section className="beliefs"><article data-reveal><span>01</span><h3>La forma segue<br/>il carattere.</h3><p>Non cerchiamo uno stile applicabile a tutto. Ogni progetto deve esprimere la meccanica e la personalità da cui nasce.</p></article><article data-reveal><span>02</span><h3>La tecnica è<br/>parte del design.</h3><p>Prestazioni, ergonomia e bellezza vengono sviluppate come un solo problema, non come discipline separate.</p></article><article data-reveal><span>03</span><h3>Il cliente è<br/>parte del progetto.</h3><p>Una Unica non si sceglie da un catalogo. Si costruisce attraverso un dialogo, fino all’ultimo dettaglio.</p></article></section>
    <section className="about-signature" data-reveal><div><p className="section-tag light">/ Il nostro nome</p><h2>Unica non è una promessa<br/>di esclusività.<br/><em>È un metodo di lavoro.</em></h2></div><Link href="/atelier/">Scopri come lavoriamo <span>↗</span></Link></section>
  </main>;
}
