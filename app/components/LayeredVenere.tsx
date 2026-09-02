"use client";

import type { CSSProperties, PointerEvent } from "react";
import { asset } from "../lib/assets";

export type VenereLayerConfiguration = {
  paintSlug: string;
  paintName: string;
  wheelSlug: string;
  wheelName: string;
  caliperSlug: string;
  caliperName: string;
};

type LayeredVenereProps = {
  configuration: VenereLayerConfiguration;
  className?: string;
  interactive?: boolean;
};

const layer = (name: string) =>
  asset(`/images/configurator/layers/side-v3/${name}`);

export default function LayeredVenere({
  configuration,
  className = "",
  interactive = true,
}: LayeredVenereProps) {
  const variables = {
    "--venere-x": "0px",
    "--venere-y": "0px",
  } as CSSProperties;

  const move = (event: PointerEvent<HTMLElement>) => {
    if (!interactive || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--venere-x", `${x * 7}px`);
    event.currentTarget.style.setProperty("--venere-y", `${y * 5}px`);
  };

  const reset = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--venere-x", "0px");
    event.currentTarget.style.setProperty("--venere-y", "0px");
  };

  return (
    <figure
      className={`layered-venere ${className}`.trim()}
      style={variables}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-label={`Unica Venere in ${configuration.paintName}, cerchi ${configuration.wheelName}, pinze ${configuration.caliperName}`}
    >
      <div className="layered-venere-frame">
        <img className="venere-layer layer-background" src={layer("master-base.webp")} alt="" />
        <img key={configuration.caliperSlug} className="venere-layer layer-brakes layer-swap" src={layer(`brakes/${configuration.caliperSlug}.webp`)} alt="" />
        <img key={configuration.wheelSlug} className="venere-layer layer-wheels layer-swap" src={layer(`wheels/${configuration.wheelSlug}.webp`)} alt="" />
        <img key={configuration.paintSlug} className="venere-layer layer-body-variant layer-swap" src={layer(`body/${configuration.paintSlug}.webp`)} alt="" />
        <img className="venere-layer layer-details" src={layer("fixed-details.webp")} alt="" />
      </div>
      <figcaption className="sr-only">
        Configurazione Venere: {configuration.paintName}, cerchi {configuration.wheelName}, pinze {configuration.caliperName}.
      </figcaption>
    </figure>
  );
}
