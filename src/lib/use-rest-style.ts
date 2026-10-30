import { useMotionValue } from "framer-motion";

/**
 * Motion values holding every animated property at rest: no offset, full size,
 * full opacity.
 *
 * Use it instead of `undefined` for the reduced-motion branch of a motion
 * `style`: `style={reduced ? rest : { x, y, scale, opacity }}`.
 *
 * Why not `undefined`: the server cannot know the visitor's motion preference,
 * so it renders the animated starting values (faded, shrunk, offset) into the
 * HTML. If the client then passes no style, nothing ever overwrites those
 * inline values and the element stays frozen mid-animation. Motion values are
 * written to the DOM by framer-motion on mount, so these replace them.
 */
export function useRestStyle() {
  const zero = useMotionValue(0);
  const one = useMotionValue(1);
  return { x: zero, y: zero, scale: one, scaleX: one, opacity: one };
}
