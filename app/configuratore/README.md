# Configuratore Venere V3

La pagina sostituisce sia il precedente configuratore della route sia quello
incorporato nella pagina Venere. Il pannello delle finiture possiede lo scroll;
il contenitore occupa il viewport sotto la navigazione. Su mobile l’anteprima
rimane sopra il pannello, sempre visibile.

- `../lib/venere-config.ts`: catalogo delle finiture. Ogni opzione ha slug,
  nome e colore esadecimale; aggiungere un’opzione non richiede nuove immagini.
- `../lib/venere-views.ts`: sorgenti, inquadrature e tracciati delle tre viste.
  Le coordinate 1376 × 768 sono esattamente un quarto delle foto HD.
- `../components/VenerePreview.tsx`: composizione del master e dei livelli
  filtrati. La configurazione argento originale mostra il master senza filtri.
- `configurator.css`: layout e adattamenti per dimensioni ridotte.

Le sorgenti sono `public/images/configurator/V3/Master/side.png`, `front.png`
e `rear.png`, ciascuna 5504 × 3072, utilizzate senza modificarle. Il vecchio
collage non è più referenziato. L’inquadratura SVG elimina lo spazio superfluo
intorno all’auto senza tagliarla e senza ridurre la risoluzione della sorgente.

Le otto maschere indipendenti si trovano in
`public/images/configurator/V3/masks/{side,front,rear}/` e sono utilizzate dal
componente per isolare i livelli fotografici. Ogni SVG ha canvas 5504 × 3072,
superficie bianca e sfondo trasparente. La vista laterale separa carrozzeria,
cerchi, pinze e sedili; frontale e posteriore separano carrozzeria e sedili.
Cerchi e pinze restano memorizzati nelle altre viste, dove non sono visibili.

Le aperture dei cerchi sono tracciate individualmente: la maschera delle pinze
viene intersecata con le aperture, preservando razze, mozzi, dischi e pneumatici.
La vernice esclude vetri, carbonio, fari e stemmi; i sedili escludono il volante.
I filtri conservano la luminanza del master e simulano i colori, senza generare
nuovi materiali fisici. Le finiture originali mostrano direttamente la fotografia.

## Aggiornare e verificare

Servono Node >= 22 e `sharp`. Se `sharp` è disponibile in un runtime esterno,
impostare `VENERE_SHARP_MODULE` al percorso del modulo.

1. Modificare i tracciati in `venere-views.ts`.
2. Eseguire `node scripts/check-venere-masks.mjs --write` per esportare gli SVG
   e verificare dimensioni, inquadrature, punti interni/esterni delle superfici
   e assenza di sovrapposizioni opache tra cerchi e pinze.
3. Eseguire `node scripts/review-venere-masks.mjs` (oppure `--hd`) per produrre
   anteprime in `tmp/venere-mask-review`. Il controllo usa gli SVG esportati,
   gli stessi del configuratore, con vernice blu, cerchi oro, pinze rosse e cuoio.
4. Senza `--write`, il controllo verifica anche che gli SVG esportati siano
   aggiornati rispetto ai tracciati sorgente.

Eseguiti i controlli geometrici e l’ispezione visiva offline delle tre viste,
con ingrandimenti dei passaruota, cerchi, parabrezza, abitacolo e fari.
Non sono stati avviati server o eseguiti commit. La build dell’app non è stata
eseguita perché le dipendenze del progetto non sono installate nel workspace.
