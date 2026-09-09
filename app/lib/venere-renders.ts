import wheelCutouts from "./venere-wheel-cutouts.json";

export type RenderView = "side" | "front" | "rear";
export type RenderCutout = { id: string; src: string; x: number; y: number; width: number; height: number };
export type RenderWheel = { slug: string; name: string; sample: string; overlays: Partial<Record<RenderView, RenderCutout[]>> };
export const renderWheels: RenderWheel[] = [
  { slug: "argento", name: "Argento", sample: "#bebbc0", overlays: { side: wheelCutouts.argento } },
  { slug: "nero", name: "Nero", sample: "#252329", overlays: { side: wheelCutouts.nero } },
];
export type RenderColour = {
  slug: string;
  name: string;
  sample: string;
  images: Partial<Record<RenderView, string>>;
};

// Only list views backed by a supplied render. No generated colours or finishes.
export const renderColours: RenderColour[] = [
  { slug: "argento", name: "Argento", sample: "#bebbc0", images: { side: "/images/configurator/V3/render/Side-View/carrozzeria/argento.png" } },
  { slug: "blu", name: "Blu", sample: "#193e77", images: { side: "/images/configurator/V3/render/Side-View/carrozzeria/blu.png" } },
  { slug: "nero", name: "Nero", sample: "#252329", images: { side: "/images/configurator/V3/render/Side-View/carrozzeria/nero.png" } },
];
export const renderViews: { id: RenderView; label: string; framing: string }[] = [
  // Framing crops only the empty studio margin. The complete car remains visible.
  { id: "side", label: "Laterale", framing: "40 150 930 290" },
  { id: "front", label: "Frontale", framing: "0 0 1000 558" },
  { id: "rear", label: "Posteriore", framing: "0 0 1000 558" },
];

export function availableViews(colour: RenderColour) {
  return renderViews.filter(view => Boolean(colour.images[view.id]));
}
