"use client";

import { Fragment, useId, useState } from "react";
import { asset } from "../lib/assets";
import { views, glossySources, type Surface, type VenereView } from "../lib/venere-views";
import type { PaintFinish } from "../lib/venere-config";
import { materialCurves } from "../lib/venere-materials";

export type VenereConfiguration = Record<Surface, { name: string; sample: string; slug: string }> & {
  paintFinish: { slug: PaintFinish; name: string };
};
const original: Partial<Record<Surface, string>> = {
  calipers: "grafite", interiors: "nero-antracite",
};

export default function VenerePreview({ view, configuration, thumbnail = false }: {
  view: VenereView; configuration: VenereConfiguration; thumbnail?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const selected = views.find(item => item.id === view)!;
  const surfaces = selected.surfaces;
  const master = asset(selected.source);
  const paintSource = configuration.paintFinish.slug === "lucida" ? asset(glossySources[view]) : master;
  const sourceKey = `${master}|${paintSource}`;
  if (failedSource === sourceKey) return <span role={thumbnail ? undefined : "alert"}>Immagine non disponibile.</span>;
  return <svg className="venere-preview" viewBox={selected.box} preserveAspectRatio="xMidYMid meet"
    role={thumbnail ? undefined : "img"} aria-hidden={thumbnail || undefined} aria-labelledby={thumbnail ? undefined : `${id}-title`}>
    {!thumbnail && <title id={`${id}-title`}>Venere, vista {selected.label.toLowerCase()}: {Object.values(configuration).map(item => item.name).join(", ")}</title>}
    <defs>
      {surfaces.map(surface => {
        const curves = materialCurves(surface, configuration[surface].sample, configuration.paintFinish.slug);
        return <Fragment key={surface}>
          <mask id={`${id}-${surface}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1376" height="768" style={{ maskType: "luminance" }}>
            <image href={asset(`/images/configurator/V3/masks/${view}/${surface}.svg`)} width="1376" height="768" onError={() => setFailedSource(sourceKey)} />
          </mask>
          <filter id={`${id}-${surface}-finish`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={curves[0]} />
              <feFuncG type="table" tableValues={curves[1]} />
              <feFuncB type="table" tableValues={curves[2]} />
            </feComponentTransfer>
          </filter>
        </Fragment>;
      })}
    </defs>
    <image href={master} width="1376" height="768" onError={() => setFailedSource(sourceKey)} />
    {surfaces.filter(surface => configuration[surface].slug !== original[surface]).map(surface =>
      <g key={surface} mask={`url(#${id}-${surface}-mask)`}>
        <image href={surface === "paint" ? paintSource : master} width="1376" height="768" filter={`url(#${id}-${surface}-finish)`} onError={() => setFailedSource(sourceKey)} />
      </g>
    )}
  </svg>;
}
