# Configuratore Venere V3

La pagina sostituisce sia il precedente configuratore della route sia quello
incorporato nella pagina Venere. Il pannello delle finiture possiede lo scroll;
il contenitore occupa il viewport sotto la navigazione. Su mobile l’anteprima
rimane sopra il pannello, sempre visibile.

- `../lib/venere-config.ts`: catalogo delle finiture. Ogni opzione ha slug,
  nome e colore esadecimale; aggiungere un’opzione non richiede nuove immagini.
- `../lib/venere-views.ts`: rettangoli delle tre viste e maschere vettoriali,
  nelle coordinate del master originale 1376 × 768.
- `../components/VenerePreview.tsx`: composizione del master e dei livelli
  filtrati. La configurazione argento originale mostra il master senza filtri.
- `configurator.css`: layout e adattamenti per dimensioni ridotte.

Il master rimane `public/images/configurator/V3/Master.png`, senza modifiche.
Le maschere SVG sono una prima tracciatura da rifinire con verifica visiva,
non livelli raster scontornati definitivi. Verificare soprattutto passaruota,
razze, confini del carbonio, cornici parabrezza e sedili. I filtri simulano il
colore dalla luminanza del master, non generano nuovi materiali fisici.
Cerchi e pinze sono modificati nella vista laterale, dove sono visibili;
le relative scelte restano memorizzate nelle altre viste.

Verifiche eseguite senza server: dimensioni PNG, rettangoli delle viste,
presenza maschere carrozzeria, slug univoci e colori delle 25 finiture.
Build e controllo TypeScript completo non eseguiti: le dipendenze del progetto
non sono installate nel workspace.
