# Configuratore Venere V3

La pagina sostituisce sia il precedente configuratore della route sia quello
incorporato nella pagina Venere. Il pannello delle finiture possiede lo scroll;
il contenitore occupa il viewport sotto la navigazione. Su mobile l’anteprima
rimane sopra il pannello, sempre visibile.

- `../lib/venere-config.ts`: catalogo delle finiture. Ogni opzione ha slug,
  nome e colore esadecimale; aggiungere un’opzione non richiede nuove immagini.
  `paintFinishes` rende Lucida e Satinata disponibili per tutti i 12 colori.
- `../lib/venere-views.ts`: sorgenti, inquadrature e tracciati delle tre viste.
  Le coordinate 1376 × 768 sono esattamente un quarto delle foto HD.
- `../components/VenerePreview.tsx`: composizione del master e dei livelli
  filtrati. Anche argento e acciaio ricevono la nuova risposta luminosa.
- `../lib/venere-materials.ts`: curve condivise da configuratore e render di
  controllo, con riflessi neutri per metalli, vernice lucida e pelle separata.
- `configurator.css`: layout e adattamenti per dimensioni ridotte.

Le sorgenti sono `public/images/configurator/V3/Master/side.png`, `front.png`
e `rear.png`, ciascuna 5504 × 3072, utilizzate senza modificarle. Il vecchio
collage non è più referenziato. L’inquadratura SVG elimina lo spazio superfluo
intorno all’auto senza tagliarla e senza ridurre la risoluzione della sorgente.

La finitura Lucida usa le nuove sorgenti `Side-lucid.png`, `Front-Lucid.png`
e `Rear-Lucid.png` della stessa cartella, tutte 5504 × 3072. Solo il livello
della carrozzeria cambia sorgente; sfondo, carbonio e componenti restano coerenti.
Satinata usa le sorgenti precedenti e una curva luminosa più morbida. La scelta
rimane selezionata cambiando colore o vista ed è inclusa in riepilogo, reset
e messaggio per l’atelier. Lucida è la finitura iniziale.

Le nove maschere indipendenti si trovano in
`public/images/configurator/V3/masks/{side,front,rear}/` e sono utilizzate dal
componente per isolare i livelli fotografici. Ogni SVG ha canvas 5504 × 3072,
superficie bianca e sfondo trasparente. La vista laterale separa carrozzeria,
cerchi, pinze, sedili e scarichi; frontale e posteriore separano carrozzeria e sedili.
Cerchi, pinze e scarichi restano memorizzati nelle altre viste, dove non sono visibili.

Le aperture dei cerchi sono tracciate individualmente: la maschera delle pinze
viene intersecata con le aperture, preservando razze, mozzi, dischi e pneumatici.
La vernice esclude vetri, carbonio, fari e stemmi; i sedili escludono il volante.
I filtri conservano la luminanza del master e simulano i colori, senza generare
nuovi materiali fisici. I riflessi provengono dalla luce fotografata. Le curve
avvicinano i punti luminosi al bianco senza tingere le alte luci di giallo.
I cerchi includono i coprimozzi nella finitura; Bianco Puro usa una risposta
neutra più luminosa, preservando ombre e rilievi. Gli scarichi isolano le due
sole cornici quadrate dal supporto comune, dal carbonio e dalle aperture e offrono acciaio lucido, titanio e nero
ceramico. Le pinze grafite e gli interni antracite mantengono il master originale.

## Aggiornare e verificare

Servono Node >= 22 e `sharp`. Se `sharp` è disponibile in un runtime esterno,
impostare `VENERE_SHARP_MODULE` al percorso del modulo.

1. Modificare i tracciati in `venere-views.ts`.
2. Eseguire `node scripts/check-venere-masks.mjs --write` per esportare gli SVG
   e verificare dimensioni, inquadrature, punti interni/esterni delle superfici
   e assenza di sovrapposizioni opache tra cerchi e pinze.
3. Eseguire `node scripts/review-venere-masks.mjs` (oppure `--hd`) per produrre
   anteprime in `tmp/venere-mask-review`. Il controllo usa gli SVG esportati,
   gli stessi del configuratore, con vernice blu, cerchi champagne, pinze rosse,
   cuoio e scarichi neri. `--white-wheels` controlla cerchi bianchi e scarichi in
   acciaio. `--satin` confronta la finitura satinata. Le immagini sono salvate
   come `*-lucida*.png` e `*-satinata*.png`. Il render di ispezione incorpora
   copie JPEG di alta qualità per contenere la dimensione del documento SVG;
   il configuratore utilizza sempre i PNG HD originali.
4. Senza `--write`, il controllo verifica anche che gli SVG esportati siano
   aggiornati rispetto ai tracciati sorgente.

Il controllo verifica anche tutte le curve delle 29 finiture, la neutralità
del bianco, il mantenimento del dettaglio nelle alte luci, i centri dei cerchi,
le sei sorgenti e le due finiture per ciascun colore. I punti di controllo degli
scarichi escludono esplicitamente il supporto esterno e la fascia tra i terminali.

Eseguiti i controlli geometrici e l’ispezione visiva offline delle tre viste,
con ingrandimenti dei passaruota, cerchi, parabrezza, abitacolo e fari.
Non sono stati avviati server o eseguiti commit. La build dell’app non è stata
eseguita perché le dipendenze del progetto non sono installate nel workspace.
