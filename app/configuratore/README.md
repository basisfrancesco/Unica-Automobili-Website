# Configuratore basato sui render

Il configuratore mostra esclusivamente i file forniti in
`public/images/configurator/V3/render/`. La prima selezione contiene Argento,
Blu e Nero, disponibili nella sola vista laterale. I cerchi sono selezionabili
in Argento o Nero: sei combinazioni, sempre usando i pixel delle foto originali.
Le carrozzerie sono in `render/Side-View/carrozzeria/`; il render con cerchi neri
è in `render/Side-View/Cerchi/nero.png`.

Il layout mantiene l’auto visibile e lo scorrimento indipendente del pannello.
Il componente `VenereRender` sovrappone due PNG trasparenti dei cerchi al render
della carrozzeria. Non applica maschere SVG o filtri di ricolorazione. Il viewport
inquadra l’auto eliminando soltanto il margine vuoto dello studio. L’immagine
diventa visibile quando base e ritagli sono caricati, evitando di mostrare
temporaneamente i cerchi della combinazione precedente.

## Ritagli fotografici

I quattro file in `public/images/configurator/V3/cutouts/wheels/` contengono
ruota anteriore e posteriore per ciascuna finitura, scontornate con trasparenza.
Argento è estratto dal render argento; Nero dalla nuova foto dedicata. Il
contorno segue il bordo del cerchio con un piccolo margine interno al pneumatico.
Disco e pinza visibili tra le razze fanno parte del ritaglio fotografico; non
sono opzioni indipendenti in questa versione.

`app/lib/venere-wheel-cutouts.json` contiene posizione e dimensioni dei ritagli,
calcolate tenendo conto delle diverse risoluzioni delle sorgenti. Non modificare
il file manualmente: rigenerarlo con lo script di estrazione.

Con Node >= 22 e `sharp` (o `VENERE_SHARP_MODULE` per un runtime esterno):

- `node scripts/build-venere-wheel-cutouts.mjs`: estrae i quattro PNG con alpha
  e rigenera le coordinate; le foto originali restano intatte.
- `node scripts/review-venere-wheel-cutouts.mjs`: controlla la trasparenza e
  produce tutte le sei combinazioni in `tmp/venere-wheel-review/`, senza server.

## Aggiungere materiale

1. Salvare il nuovo render nella cartella pubblica.
2. Aggiungere colore, nome, campione e percorsi in `app/lib/venere-renders.ts`.
3. Per una nuova vista aggiungere `front` o `rear` al campo `images` del colore.
   La navigazione mostra automaticamente solo le viste realmente disponibili.
4. Se necessario regolare `framing` della vista per l’inquadratura, mantenendo
   visibili tutta l’auto e l’ombra.
5. Per nuove viste o finiture dei cerchi aggiungere i ritagli corrispondenti in
   `renderWheels`, prima di abilitare la nuova combinazione.

I PNG vengono utilizzati nella loro risoluzione originale. Argento è 3855 × 2152;
Blu e Nero sono 5504 × 3072. Non è necessario uniformare la risoluzione.

Il precedente motore di ricolorazione rimane rimosso. I vecchi master non sono
usati da questa versione. La verifica è offline; nessun server o commit avviato.
