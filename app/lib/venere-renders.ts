import library from "./venere-3view.json";
export type RenderView = "side" | "front" | "rear";
export type RenderCutout = { id: string; src: string; x: number; y: number; width: number; height: number };
export type RenderOption = { slug: string; name: string; sample: string; overlays: Partial<Record<RenderView, RenderCutout[]>> };
export type RenderGroup = { id: string; label: string; options: RenderOption[] };
export type RenderColour = { slug: string; name: string; sample: string; images: Record<RenderView, string>; thumbnails: Record<RenderView, string> };
export const renderColours: RenderColour[] = library.colours;
export const renderGroups: RenderGroup[] = library.groups;
export const renderViews = library.views as { id: RenderView; label: string; framing: string; height: number }[];
export function selectedOverlays(selection: Record<string, number>, view: RenderView) {
  return renderGroups.flatMap(group => group.options[selection[group.id] ?? 0].overlays[view] ?? []);
}
