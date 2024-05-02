import {
  BrandVariants,
  createDarkTheme,
  createDOMRenderer,
  createLightTheme,
  GriffelRenderer,
  Theme,
} from "@fluentui/react-components";
import {
  getMediaDownQuery,
  getMediaUpQuery,
} from "../utils/styles/media-query";

export function createThemes(): {
  light: Theme;
  dark: Theme;
} {
  const themes: BrandVariants = {
    10: "#010402",
    20: "#0E1C15",
    30: "#102F21",
    40: "#103D29",
    50: "#0E4B32",
    60: "#095A3B",
    70: "#016944",
    80: "#287653",
    90: "#408362",
    100: "#569072",
    110: "#6A9D82",
    120: "#7FAB93",
    130: "#93B8A4",
    140: "#A7C6B5",
    150: "#BCD3C6",
    160: "#D1E1D8",
  };

  const fontFamilyBase = "'Noto Sans HK', sans-serif";

  const themeAdjustment: Partial<Theme> = {
    fontFamilyBase,
  };

  const lightTheme: Theme = {
    ...createLightTheme(themes),
    ...themeAdjustment,
  };

  const darkTheme: Theme = {
    ...createDarkTheme(themes),
    ...themeAdjustment,
    colorBrandForeground1: themes[110], // use brand[110] instead of brand[100]
    colorBrandForeground2: themes[120], // use brand[120] instead of brand[110]
  };

  return {
    light: lightTheme,
    dark: darkTheme,
  };
}

/**
 * Create Fluent UI renderer.
 * - Config media queries sorting
 *
 * @see {@link https://react.fluentui.dev/?path=/docs/concepts-developer-advanced-configuration--page#media-queries-sorting}
 */
export function createFluentRenderer(): GriffelRenderer {
  const mediaQueryOrder = [
    // media down
    getMediaDownQuery("xxxLarge"),
    getMediaDownQuery("xxLarge"),
    getMediaDownQuery("xLarge"),
    getMediaDownQuery("large"),
    getMediaDownQuery("medium"),
    getMediaDownQuery("small"),

    // media up
    getMediaUpQuery("small"),
    getMediaUpQuery("medium"),
    getMediaUpQuery("large"),
    getMediaUpQuery("xLarge"),
    getMediaUpQuery("xxLarge"),
    getMediaUpQuery("xxxLarge"),
  ];

  return createDOMRenderer(undefined, {
    compareMediaQueries(a, b) {
      return mediaQueryOrder.indexOf(a) - mediaQueryOrder.indexOf(b);
    },
  });
}
