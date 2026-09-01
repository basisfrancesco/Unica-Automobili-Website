"use client";

import type { CSSProperties, PointerEvent } from "react";
import { asset } from "../lib/assets";

export type VenereLayerConfiguration = {
  paint: string;
  paintName: string;
  paintDepth: number;
  caliper: string;
  caliperName: string;
  highlightOpacity: number;
};

type LayeredVenereProps = {
  configuration: VenereLayerConfiguration;
  className?: string;
  interactive?: boolean;
};

const layer = (name: string) =>
  asset(`/images/configurator/layers/side/${name}`);

export default function LayeredVenere({
  configuration,
  className = "",
  interactive = true,
}: LayeredVenereProps) {
  const variables = {
    "--venere-paint": configuration.paint,
    "--venere-paint-depth": configuration.paintDepth,
    "--venere-caliper": configuration.caliper,
    "--venere-highlights": configuration.highlightOpacity,
    "--venere-x": "0px",
    "--venere-y": "0px",
    "--venere-body-mask": `url("${layer("body-mask.png")}")`,
    "--venere-caliper-mask": `url("${layer("calipers-mask.png")}")`,
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
      aria-label={`Unica Venere in ${configuration.paintName}, con pinze ${configuration.caliperName}`}
    >
      <div className="layered-venere-frame">
        <img className="venere-layer layer-background" src={layer("background-shadow.png")} alt="" />
        <img className="venere-layer layer-brakes" src={layer("brakes.png")} alt="" />
        <div className="venere-layer layer-calipers" />
        <img className="venere-layer layer-wheels" src={layer("wheels-silver.png")} alt="" />
        <img className="venere-layer layer-body" src={layer("body-neutral.png")} alt="" />
        <div className="venere-layer layer-paint" />
        <div className="venere-layer layer-paint-depth" />
        <img className="venere-layer layer-highlights" src={layer("body-highlights.png")} alt="" />
        <img className="venere-layer layer-details" src={layer("fixed-details.png")} alt="" />
      </div>
      <figcaption className="sr-only">
        Configurazione Venere: {configuration.paintName}, pinze {configuration.caliperName}.
      </figcaption>
    </figure>
  );
}
