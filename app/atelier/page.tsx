import { asset } from "../lib/assets";

export default function AtelierPage() {
  return <main className="atelier-page">
    <section className="atelier-photo-hero"><img src={asset("/images/atelier/atelier.png")} alt="Atelier Unica Automobili"/><div className="atelier-photo-shade"/><div><p className="section-tag light">/ L’atelier</p><h1>Dall’idea<br/><em>alla materia.</em></h1><p>Un solo luogo, tutte le competenze necessarie per costruire un’automobile coerente.</p></div></section>
    <section className="atelier-intro" data-reveal><p className="section-tag">/ Il nostro metodo</p><h2>Ogni progetto è un percorso.<br/>Ogni scelta lascia <em>un segno.</em></h2></section>
    <section className="process-v2">
      <article data-reveal><div className="process-number">01</div><div><span>Conversazione</span><h3>Ascoltare prima<br/>di disegnare.</h3></div><p>Il progetto comincia da come guidi, da cosa cerchi e da ciò che nessuna automobile di serie riesce a darti.</p></article>
      <article data-reveal><div className="process-number">02</div><div><span>Design</span><h3>Trovare una forma<br/>necessaria.</h3></div><p>Schizzi, superfici e proporzioni evolvono fino a quando ogni linea smette di essere una scelta e diventa inevitabile.</p></article>
      <article data-reveal><div className="process-number">03</div><div><span>Engineering</span><h3>Far funzionare<br/>la bellezza.</h3></div><p>Aerodinamica, raffreddamento, ergonomia e comportamento dinamico vengono risolti insieme al linguaggio formale.</p></article>
      <article data-reveal><div className="process-number">04</div><div><span>Coachbuilding</span><h3>Trasformare il progetto<br/>in presenza.</h3></div><p>Materiali, accoppiamenti e finiture vengono lavorati e controllati con il tempo necessario a costruire qualcosa di irripetibile.</p></article>
    </section>
    <section className="material-band"><div data-reveal><span>Design</span><i/><span>Engineering</span><i/><span>Coachbuilding</span></div><h2 data-reveal>Non esistono due<br/><em>Unica uguali.</em></h2></section>
    <section className="contact-studio" id="contatti"><p className="section-tag">/ Il tuo progetto</p><div><h2>Raccontaci<br/>la tua idea.</h2><a href="mailto:atelier@unicaautomobili.it">atelier@unicaautomobili.it <span>↗</span></a></div></section>
  </main>;
}
