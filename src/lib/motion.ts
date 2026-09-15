import { ANIMATION_EASE as ease } from "../constants";

/** Stagger parent, animates children in sequence */
export const staggerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
} as const;

/** Standard fade-up for text/labels */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
} as const;
