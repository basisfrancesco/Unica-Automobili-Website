"use client";

import { Fragment, useId, useState } from "react";
import { asset } from "../lib/assets";
import { views, type Surface, type VenereView } from "../lib/venere-views";

export type VenereConfiguration = Record<Surface, { name: string; sample: string; slug: string }>;
const original: Record<Surface, string> = {
  paint: "argento-venere", wheels: "argento-satinato", calipers: "grafite", interiors: "nero-antracite",
};

export default function VenerePreview({ view, configuration, thumbnail = false }: {
  view: VenereView; configuration: VenereConfiguration; thumbnail?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const selected = views.find(item => item.id === view)!;
  const surfaces = selected.surfaces;
  const master = asset(selected.source);
  if (failedSource === master) return <span role={thumbnail ? undefined : "alert"}>Immagine non disponibile.</span>;
  return <svg className="venere-preview" viewBox={selected.box} preserveAspectRatio="xMidYMid meet"
    role={thumbnail ? undefined : "img"} aria-hidden={thumbnail || undefined} aria-labelledby={thumbnail ? undefined : `${id}-title`}>
    {!thumbnail && <title id={`${id}-title`}>Venere, vista {selected.label.toLowerCase()}: {Object.values(configuration).map(item => item.name).join(", ")}</title>}
    <defs>
      {surfaces.map(surface => {
        const rgb = configuration[surface].sample.match(/[a-f\d]{2}/gi)!.map(channel => parseInt(channel, 16) / 255);
        // Transfer master luminance into the selected finish, keeping shadows and highlights.
        const ramp = (channel: number) => surface === "interiors"
          ? `0 ${channel * .55} ${channel} ${channel + (1 - channel) * .55} 1`
          : `0 ${channel * .22} ${channel * .65} ${channel} 1`;
        return <Fragment key={surface}>
          <mask id={`${id}-${surface}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1376" height="768" style={{ maskType: "luminance" }}>
            <image href={asset(`/images/configurator/V3/masks/${view}/${surface}.svg`)} width="1376" height="768" onError={() => setFailedSource(master)} />
          </mask>
          <filter id={`${id}-${surface}-finish`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={ramp(rgb[0])} />
              <feFuncG type="table" tableValues={ramp(rgb[1])} />
              <feFuncB type="table" tableValues={ramp(rgb[2])} />
            </feComponentTransfer>
          </filter>
        </Fragment>;
      })}
    </defs>
    <image href={master} width="1376" height="768" onError={() => setFailedSource(master)} />
    {surfaces.filter(surface => configuration[surface].slug !== original[surface]).map(surface =>
      <g key={surface} mask={`url(#${id}-${surface}-mask)`}>
        <image href={master} width="1376" height="768" filter={`url(#${id}-${surface}-finish)`} />
      </g>
    )}
  </svg>;
}
