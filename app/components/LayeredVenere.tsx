"use client";

import { asset } from "../lib/assets";

export type VenereLayerConfiguration = {
  paintSlug: string;
  paintName: string;
  wheelSlug: string;
  wheelName: string;
  caliperSlug: string;
  caliperName: string;
  interiorSlug: string;
  interiorName: string;
};

type LayeredVenereProps = {
  configuration: VenereLayerConfiguration;
  className?: string;
};

const layer = (name: string) =>
  asset(`/images/configurator/layers/side-v5/${name}`);

export default function LayeredVenere({
  configuration,
  className = "",
}: LayeredVenereProps) {
  return (
    <figure
      className={`layered-venere ${className}`.trim()}
      aria-label={`Unica Venere in ${configuration.paintName}, cerchi ${configuration.wheelName}, pinze ${configuration.caliperName}, interni ${configuration.interiorName}`}
    >
      <div className="layered-venere-frame">
        <img className="venere-layer layer-background" src={layer("master-base.webp")} alt="" />
        <img key={configuration.caliperSlug} className="venere-layer layer-brakes layer-swap" src={layer(`brakes/${configuration.caliperSlug}.webp`)} alt="" />
        <img key={configuration.wheelSlug} className="venere-layer layer-wheels layer-swap" src={layer(`wheels/${configuration.wheelSlug}.webp`)} alt="" />
        <img key={configuration.paintSlug} className="venere-layer layer-body-variant layer-swap" src={layer(`body/${configuration.paintSlug}.webp`)} alt="" />
        <img className="venere-layer layer-details" src={layer("fixed-details.webp")} alt="" />
        <img key={configuration.interiorSlug} className="venere-layer layer-interior layer-swap" src={layer(`interiors/${configuration.interiorSlug}.webp`)} alt="" />
      </div>
      <figcaption className="sr-only">
        Configurazione Venere: {configuration.paintName}, cerchi {configuration.wheelName}, pinze {configuration.caliperName}, interni {configuration.interiorName}.
      </figcaption>
    </figure>
  );
}
