# Configuratore fotografico 3View

Le sorgenti attive sono in `public/images/configurator/V3/render/3View/`:
Body (argento, blu, verde inglese, arancione, azzurro, rosso scuro), Cerchi (argento, nero, oro, bianco),
Interni (nero, bianco, blu, marrone, panna), pinze (argento, giallo, nero, rosso),
scarichi (argento, nero, titanio). Sono 1.440 configurazioni con tre viste.

Ogni sorgente è una tavola 5504 × 3072. Lo script applica gli stessi
rettangoli a tutte le tavole: laterale sopra, frontale sotto a sinistra,
posteriore sotto a destra. Coordinate e contorni sono espressi su una
tavola di riferimento larga 1400 pixel, poi convertiti alla risoluzione
nativa. Un ritaglio comune conserva l'allineamento delle sorgenti: non
corregge una diversa prospettiva o geometria in eventuali nuove foto.

## Generazione

Con Node >= 22 e sharp installato (o percorso del modulo in
`VENERE_SHARP_MODULE`):

- `node scripts/build-venere-3view.mjs`
- `node scripts/review-venere-3view.mjs`

Il primo script genera le immagini in `public/images/configurator/V3/generated/`
e il catalogo `app/lib/venere-3view.json`. Gli originali non vengono modificati.
I contorni servono solo offline per estrarre i pixel fotografici e la loro
trasparenza. Non vengono applicati filtri colore o maschere nel browser.

L'ordine è carrozzeria, cerchi, interni, pinze, scarichi. I cerchi comprendono
il mozzo e il disco originale; le pinze sono ritagliate separatamente nelle
aperture delle razze. La foto delle pinze gialle fornisce il contorno, inclusa
la scritta, per tutte le finiture. Gli scarichi comprendono solo i due
terminali laterali, escludendo il pannello in carbonio circostante.
Gli interni hanno ritagli specifici per ciascuna vista.

Cerchi, pinze e terminali sono visibili nella laterale. Nelle due viste
ortogonali fronte/retro sono nascosti: le selezioni restano memorizzate,
senza sovrapposizioni. In particolare, le gomme dorate errate del render
dei cerchi oro non vengono mai importate.

## Caricamento e layout

Basi WebP qualità 94 (2200 px laterale, 1400 px fronte/retro), ritagli WebP
con alpha lossless dopo ridimensionamento e miniature da 240 px.
Le miniature sono riferimenti della vista e del colore carrozzeria;
i dettagli configurabili sono mostrati nell'anteprima principale.
La prima configurazione usa circa 380 KiB di immagini; il catalogo completo
circa 4,3 MiB. Sono pesi dei file, non tempi di rete misurati.

Il renderer condivide i download, precarica su hover/focus e sostituisce
l'intera composizione solo dopo la decodifica dei nuovi file. La precedente
immagine rimane visibile con indicatore di caricamento. Le richieste obsolete
non possono sostituire una selezione più recente. Gli URL includono un hash
del contenuto per evitare asset vecchi nella cache. Non è necessario caricare
le altre combinazioni all'apertura.

Il layout mantiene l'auto visibile, tre viste a sinistra e solo il menu
opzioni scorrevole a destra. Su mobile l'anteprima rimane sopra il menu.

## Verifica e nuovo materiale

Lo script di verifica controlla tutte le 1.440 selezioni nelle tre viste,
file, registrazione, alpha e assenza di sovrapposizioni cerchi/pinze/scarichi
sulle gomme frontali e posteriori. Produce 33 composizioni in
`tmp/3view-review/` per la verifica visiva, senza avviare un server.

Per aggiungere una finitura, inserire la tavola nel gruppo corretto,
aggiungerla a `scripts/build-venere-3view.mjs`, rigenerare e ispezionare
gli abbinamenti. Cambiamenti di geometria richiedono nuovi contorni.
I vecchi render e ritagli non sono referenziati dal catalogo corrente.

Il ritaglio posteriore degli interni include solo i sedili visibili e la fascia superiore con lo specchio. Il riflesso sulla carrozzeria tra i due rialzi rimane nella base: il controllo alpha protegge esplicitamente quella zona per tutte e cinque le finiture.
