import type { Surface } from "./venere-views";
import type { PaintFinish } from "./venere-config";

/** Luminance curves shared by the live SVG and offline reviews.
 * Highlights come from the photographed lighting, never from a flat white overlay.
 * Metallic surfaces converge towards neutral light; leather keeps its softer response.
 */
export function materialCurves(surface: Surface, sample: string, finish: PaintFinish = "lucida") {
  const rgb = sample.match(/[a-f\d]{2}/gi)!.map(channel => parseInt(channel, 16) / 255);
  if (surface === "interiors") {
    return rgb.map(c => `0 ${c * .55} ${c} ${c + (1 - c) * .55} 1`);
  }
  if (surface === "paint" && finish === "satinata") {
    return rgb.map(c => `0 ${c * .22} ${c * .65} ${c} 1`);
  }
  const white = Math.min(...rgb) > .94;
  const metal = surface === "wheels" || surface === "exhausts";
  const ceramic = surface === "exhausts" && Math.max(...rgb) < .25;
  return rgb.map(channel => Array.from({ length: 33 }, (_, index) => {
    const light = index / 32;
    // Reflective metal has a brighter, less chromatic shoulder than coloured clearcoat.
    const start = ceramic ? .65 : metal ? .32 : .55;
    const reflection = Math.pow(Math.max(0, (light - start) / (1 - start)), ceramic ? 2.8 : metal ? 1.65 : 1.25);
    const shadow = Math.min(1, light / .16);
    const diffuse = white
      ? Math.pow(light, .18) * shadow * shadow * (3 - 2 * shadow)
      : Math.min(1, Math.pow(light / .73, 1.5));
    const value = channel * diffuse * (1 - reflection) + reflection;
    return Math.min(1, Math.max(0, value)).toFixed(5);
  }).join(" "));
}
