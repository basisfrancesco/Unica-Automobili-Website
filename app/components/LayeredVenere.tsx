"use client";

import { useEffect, useRef } from "react";
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

function MaskedColorLayer({
  className,
  mask,
  color,
}: {
  className: string;
  mask: string;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let cancelled = false;
    const maskImage = new Image();
    maskImage.decoding = "async";
    maskImage.onload = () => {
      if (cancelled) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "source-over";
      context.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "source-in";
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "source-over";
    };
    maskImage.src = layer(mask);

    return () => {
      cancelled = true;
      maskImage.onload = null;
    };
  }, [color, mask]);

  return <canvas ref={canvasRef} className={`venere-layer ${className}`} width="1365" height="768" aria-hidden="true" />;
}

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
        <MaskedColorLayer className="layer-calipers" mask="calipers-mask-alpha-v2.png" color={configuration.caliper} />
        <img className="venere-layer layer-wheels" src={layer("wheels-silver.png")} alt="" />
        <img className="venere-layer layer-body" src={layer("body-neutral.png")} alt="" />
        <MaskedColorLayer className="layer-paint" mask="body-mask-alpha-v2.png" color={configuration.paint} />
        <MaskedColorLayer className="layer-paint-depth" mask="body-mask-alpha-v2.png" color="#000000" />
        <img className="venere-layer layer-highlights" src={layer("body-highlights.png")} alt="" />
        <img className="venere-layer layer-details" src={layer("fixed-details.png")} alt="" />
      </div>
      <figcaption className="sr-only">
        Configurazione Venere: {configuration.paintName}, pinze {configuration.caliperName}.
      </figcaption>
    </figure>
  );
}
