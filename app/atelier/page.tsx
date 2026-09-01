import { asset } from "../lib/assets";

export default function AtelierPage() {
  return <main className="atelier-page">
    <section className="atelier-photo-hero"><img src={asset("/images/atelier/atelier.png")} alt="Atelier Unica Automobili"/><div className="atelier-photo-shade"/><div><p className="section-tag light">/ L’atelier</p><h1>Dall’idea<br/><em>alla materia.</em></h1><p>Un solo luogo, tutte le competenze necessarie per costruire un’automobile coerente.</p></div></section>
    <section className="atelier-intro" data-reveal><p className="section-tag">/ Il nostro metodo</p><h2>La tua automobile.<br/>Con noi, <em>dall’inizio alla fine.</em></h2></section>
    <section className="process-v2">
      <article data-reveal><div className="process-number">01</div><div><span>Conversazione</span><h3>Prima di tutto,<br/>ci conosciamo.</h3></div><p>Parli direttamente con noi. Vogliamo capire come guidi, cosa ami e ciò che nessuna automobile di serie riesce a darti.</p></article>
      <article data-reveal><div className="process-number">02</div><div><span>Co-creazione</span><h3>Ogni scelta<br/>è davvero tua.</h3></div><p>Colori, materiali, dettagli, assetto e carattere vengono definiti insieme. La personalizzazione non è una lista di optional, ma parte del progetto.</p></article>
      <article data-reveal><div className="process-number">03</div><div><span>Accesso diretto</span><h3>La costruzione<br/>non avviene lontano.</h3></div><p>Puoi seguire l’avanzamento, parlare con chi lavora sulla vettura e venire in atelier ogni volta che vuoi. Le nostre porte restano aperte.</p></article>
      <article data-reveal><div className="process-number">04</div><div><span>Consegna</span><h3>Il primo viaggio<br/>inizia molto prima.</h3></div><p>Quando l’automobile è pronta, conosci già ogni scelta e ogni passaggio che l’ha resa tua. La consegna non conclude il rapporto: lo porta sulla strada.</p></article>
    </section>
    <section className="material-band"><div data-reveal><span>Design</span><i/><span>Engineering</span><i/><span>Coachbuilding</span></div><h2 data-reveal>Non esistono due<br/><em>Unica uguali.</em></h2></section>
    <section className="contact-studio" id="contatti"><p className="section-tag">/ Il tuo progetto</p><div><h2>Raccontaci<br/>la tua idea.</h2><a href="mailto:atelier@unicaautomobili.it">atelier@unicaautomobili.it <span>↗</span></a></div></section>
  </main>;
}
