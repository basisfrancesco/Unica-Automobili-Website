import Link from "next/link";
import { asset } from "../lib/assets";
import VenereTransformation from "../components/VenereTransformation";
import "./venere.css";

const photo = (name: string) => asset(`/images/V3/web/${name}.webp`);

const perspectives = [
  { image: "front-three-quarter", label: "01 / Il primo incontro", title: "La presenza è tutto.", text: "Bassa, larga, raccolta. Una linea di carattere che nasce dall’equilibrio tra proporzioni nuove e una memoria ancora riconoscibile.", alt: "Venere, tre quarti anteriore" },
  { image: "side", label: "02 / Il profilo", title: "Una linea. Nessuna interruzione.", text: "Cofano disteso, abitacolo arretrato, coda compatta. Nel profilo si legge il senso di ogni trasformazione.", alt: "Venere, vista laterale completa" },
  { image: "rear-three-quarter", label: "03 / La coda", title: "L’ultima impressione.", text: "I volumi dietro i sedili accompagnano lo sguardo fino alla firma luminosa. Una forma che resta nella memoria.", alt: "Venere, tre quarti posteriore" },
];

const details = [
  { image: "front-light", index: "01", title: "Lo sguardo.", text: "La luce entra nella scultura della carrozzeria: superfici, ombre e tecnologia si fondono in un gesto essenziale.", alt: "Dettaglio del nuovo faro anteriore Venere" },
  { image: "side-vent", index: "02", title: "La voce.", text: "Lo scarico laterale fa parte del disegno e ne racconta il carattere. Nessun dettaglio è un’aggiunta casuale.", alt: "Dettaglio dello scarico laterale Venere" },
  { image: "rear-light", index: "03", title: "La firma.", text: "Un cerchio di luce emerge dai volumi della coda: immediato, riconoscibile, personale.", alt: "Dettaglio del fanale posteriore Venere" },
];

export default function VenerePage() {
  return <main className="v-story v-editorial">
    <section className="v-opening" aria-labelledby="venere-heading">
      <div className="v-opening-copy">
        <p className="v-kicker">Unica Automobili / Progetto 01</p>
        <h1 id="venere-heading">Venere<span>La forma del desiderio.</span></h1>
        <p>Un’anima italiana.<br/>Una nuova libertà.</p>
      </div>
      <img className="v-opening-car" src={photo("front-three-quarter")} alt="Venere, vista completa a tre quarti anteriore" fetchPriority="high" width="2200" height="1228"/>
      <div className="v-opening-bottom"><a href="#essenza">Scopri la sua storia <span aria-hidden="true">↓</span></a><span>V8 aspirato · Barchetta · Unica</span></div>
      <span className="v-outline" aria-hidden="true">VENERE</span>
    </section>

    <section className="v-origin" id="essenza">
      <div className="v-origin-art" data-reveal>
        <img src={photo("front-light")} alt="Il dettaglio luminoso del frontale Venere" loading="lazy"/>
        <span className="v-photo-note">Disegnata per essere riconosciuta</span>
        <img className="v-origin-seal" src={photo("front-logo")} alt="Scudo Unica sulla carrozzeria" loading="lazy"/>
      </div>
      <div className="v-origin-copy" data-reveal>
        <p className="v-kicker">L’essenza / Da Bergamo, Italia</p>
        <h2>La memoria<br/>di una GT.<br/><em>L’istinto di<br/>qualcosa di nuovo.</em></h2>
        <p>Venere nasce dalla prima generazione Maserati GranTurismo. Ne conserva l’idea di un V8 4.7 aspirato e ne reinterpreta proporzioni, masse e rapporto con chi guida.</p>
        <div className="v-origin-foot"><span>Passo accorciato.<br/>Masse raccolte.</span><span>Sei rapporti.<br/>Tre pedali.</span></div>
      </div>
    </section>

    <VenereTransformation />

    <section className="v-flow" id="design" aria-labelledby="v-design-title">
      <div className="v-flow-intro" data-reveal>
        <p className="v-kicker">La forma / Una storia da attraversare</p>
        <h2 id="v-design-title">Ogni prospettiva<br/><em>rivela qualcosa.</em></h2>
        <p>Non serve scegliere una vista. Segui le superfici e lascia che sia lo scorrimento a raccontare la Venere.</p>
      </div>
      {perspectives.map((view, index) => <article className={`v-flow-scene v-flow-scene-${index+1}`} key={view.image}>
        <div className="v-flow-visual"><img src={photo(view.image)} alt={view.alt} loading="lazy" width="2200" height="1228"/></div>
        <div className="v-flow-caption" data-reveal>
          <span>{view.label}</span>
          <h3>{view.title}</h3>
          <p>{view.text}</p>
        </div>
      </article>)}
    </section>

    <section className="v-details" aria-labelledby="v-detail-heading">
      <div className="v-details-intro" data-reveal>
        <p className="v-kicker">Avvicinati / I dettagli</p>
        <h2 id="v-detail-heading">Il carattere<br/>è nelle <em>sfumature.</em></h2>
        <p>Tre dettagli, un unico linguaggio. Nessuna scheda da aprire: ogni elemento trova naturalmente il suo spazio.</p>
      </div>
      <div className="v-details-grid">
        {details.map((item, index) => <figure className={`v-detail-figure v-detail-figure-${index+1}`} key={item.image} data-reveal>
          <div className="v-detail-photo"><img src={photo(item.image)} alt={item.alt} loading="lazy"/></div>
          <figcaption><span>{item.index} / 03</span><h3>{item.title}</h3><p>{item.text}</p></figcaption>
        </figure>)}
      </div>
    </section>

    <section className="v-mechanics" aria-labelledby="v-mechanics-heading">
      <div className="v-mechanics-heading" data-reveal><p className="v-kicker">Sotto la pelle / Il gesto di guidare</p><h2 id="v-mechanics-heading">Prima di tutto,<br/><em>un’automobile.</em></h2></div>
      <div className="v-mechanics-stories">
        <article className="v-mechanics-story" data-reveal>
          <div className="v-mechanics-image"><img src={asset("/images/venere/technical/engine.png")} alt="Il motore V8 4.7 della GranTurismo" loading="lazy"/></div>
          <div className="v-mechanics-copy"><p className="v-kicker">01 / Il motore</p><span className="v-mechanical-number">4.7<small>V8 aspirato</small></span><h3>Una voce da conservare.</h3><p>Il V8 viene riportato alla sua forma migliore e affinato con interventi mirati su respirazione, risposta e scarico. Il carattere rimane il vero dato da misurare.</p></div>
        </article>
        <article className="v-mechanics-story v-mechanics-story-reverse" data-reveal>
          <div className="v-mechanics-image"><img src={asset("/images/venere/technical/gearbox.png")} alt="Comando del cambio manuale" loading="lazy"/></div>
          <div className="v-mechanics-copy"><p className="v-kicker">02 / La trasmissione</p><span className="v-mechanical-number">6<small>rapporti</small></span><h3>Il controllo torna nelle mani.</h3><p>La trasmissione transaxle MC-Shift viene ripensata nell’azionamento per restituire al pilota la leva, la frizione e il controllo diretto.</p></div>
        </article>
      </div>
    </section>

    <section className="v-signature-story">
      <div className="v-signature-heading" data-reveal><p className="v-kicker">L’identità / Due segni, una storia</p><h2>Unica, nel nome.<br/><em>Venere, nell’anima.</em></h2></div>
      <figure className="v-signature-front" data-reveal><img src={photo("front-logo")} alt="Lo scudo Unica sul cofano" loading="lazy"/><figcaption>La firma di chi la immagina.</figcaption></figure>
      <figure className="v-signature-rear" data-reveal><img src={photo("rear-logo")} alt="Il nome Venere sulla coda" loading="lazy"/><figcaption>Il nome che ne racconta la forma.</figcaption></figure>
      <p className="v-signature-note">Superfici, riflessi, piccoli segni.<br/>La stessa cura, a ogni distanza.</p>
    </section>

    <section className="v-finale" id="configuratore">
      <img src={photo("rear-three-quarter")} alt="Venere vista da dietro a tre quarti" loading="lazy" width="2200" height="1228"/>
      <div data-reveal><p className="v-kicker">Il prossimo capitolo / Il tuo</p><h2>Immaginala.<br/><em>Falla tua.</em></h2><Link href="/configuratore/">Configura la tua Venere <span aria-hidden="true">↗</span></Link></div>
    </section>
  </main>;
}
