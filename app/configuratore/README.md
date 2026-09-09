# Configuratore basato sui render

Il configuratore mostra esclusivamente i file forniti in
`public/images/configurator/V3/render/`. La prima selezione contiene Argento,
Blu e Nero, disponibili nella sola vista laterale. Colore, finitura, cerchi,
interni e dettagli sono quelli fotografati: nessun filtro o maschera li modifica.

Il layout mantiene l’auto visibile e lo scorrimento indipendente del pannello.
Il componente `VenereRender` contiene una sola immagine; il viewport SVG
inquadra l’auto eliminando soltanto il margine vuoto dello studio.

## Aggiungere materiale

1. Salvare il nuovo render nella cartella pubblica.
2. Aggiungere colore, nome, campione e percorsi in `app/lib/venere-renders.ts`.
3. Per una nuova vista aggiungere `front` o `rear` al campo `images` del colore.
   La navigazione mostra automaticamente solo le viste realmente disponibili.
4. Se necessario regolare `framing` della vista per l’inquadratura, mantenendo
   visibili tutta l’auto e l’ombra.

I PNG vengono utilizzati nella loro risoluzione originale. Argento è 3855 × 2152;
Blu e Nero sono 5504 × 3072. Non è necessario uniformare la risoluzione.

Il precedente motore di livelli, le maschere generate e gli script relativi
sono stati rimossi. I master forniti dall’utente sono conservati come sorgenti,
ma non sono usati da questa versione.
