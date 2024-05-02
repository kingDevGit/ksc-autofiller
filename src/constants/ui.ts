import { shorthands } from "@fluentui/react-components";

export const BREAKPOINTS = {
  xSmall: 0,
  small: 320,
  medium: 480,
  large: 640,
  xLarge: 1024,
  xxLarge: 1366,
  xxxLarge: 1920,
};

export type Breakpoint = keyof typeof BREAKPOINTS;

function createGridSpanSize(size: number) {
  const width = `${(size / 12) * 100}%`;
  return {
    ...shorthands.flex(0, 0, width),
    maxWidth: width,
  };
}

export const GRID_SIZES = {
  none: shorthands.flex("none"),
  auto: shorthands.flex("auto"),
  flex1: shorthands.flex(1),
  span1: createGridSpanSize(1),
  span2: createGridSpanSize(2),
  span3: createGridSpanSize(3),
  span4: createGridSpanSize(4),
  span5: createGridSpanSize(5),
  span6: createGridSpanSize(6),
  span7: createGridSpanSize(7),
  span8: createGridSpanSize(8),
  span9: createGridSpanSize(9),
  span10: createGridSpanSize(10),
  span11: createGridSpanSize(11),
  span12: createGridSpanSize(12),
};
