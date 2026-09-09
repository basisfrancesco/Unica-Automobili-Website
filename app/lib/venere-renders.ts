export type RenderView = "side" | "front" | "rear";
export type RenderColour = {
  slug: string;
  name: string;
  sample: string;
  images: Partial<Record<RenderView, string>>;
};

// Only list views backed by a supplied render. No generated colours or finishes.
export const renderColours: RenderColour[] = [
  { slug: "argento", name: "Argento", sample: "#bebbc0", images: { side: "/images/configurator/V3/render/Side-View/argento.png" } },
  { slug: "blu", name: "Blu", sample: "#193e77", images: { side: "/images/configurator/V3/render/Side-View/blu.png" } },
  { slug: "nero", name: "Nero", sample: "#252329", images: { side: "/images/configurator/V3/render/Side-View/nero.png" } },
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
