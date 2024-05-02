import { GriffelStyle } from "@fluentui/react-components";
import { Breakpoint, BREAKPOINTS } from "../../constants/ui";

export function getMediaDownQuery(breakpoint: Breakpoint): string | null {
  const breakpointVal = BREAKPOINTS[breakpoint];
  if (breakpointVal === 0) {
    return null;
  }
  return `(max-width: ${breakpointVal - 0.02}px)`;
}

export function getMediaUpQuery(breakpoint: Breakpoint): string | null {
  const breakpointVal = BREAKPOINTS[breakpoint];
  if (breakpointVal === 0) {
    return null;
  }
  return `(min-width: ${breakpointVal}px)`;
}

export const mediaQuery = {
  down(
    breakpoint: Exclude<Breakpoint, "xSmall">,
    style: GriffelStyle
  ): Record<string, GriffelStyle> {
    const mediaQuery = getMediaDownQuery(breakpoint);
    if (!mediaQuery) {
      throw new Error("No media down query is found for " + breakpoint);
    }
    return {
      [`@media ${mediaQuery}`]: style,
    };
  },
  up(
    breakpoint: Exclude<Breakpoint, "xSmall">,
    style: GriffelStyle
  ): Record<string, GriffelStyle> {
    const mediaQuery = getMediaUpQuery(breakpoint);
    if (!mediaQuery) {
      throw new Error("No media up query is found for " + breakpoint);
    }
    return {
      [`@media ${mediaQuery}`]: style,
    };
  },
};
