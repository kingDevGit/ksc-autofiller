import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { BREAKPOINTS } from "../../constants/ui";

export const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingHorizontalXXXL),
    ...shorthands.margin("auto"),
    width: "100%",
    maxWidth: `${BREAKPOINTS.xLarge}px`,
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url("./bg.jpg")`,
    backgroundSize: "200%",
  },
  container: {},
  button: {
    marginLeft: tokens.spacingHorizontalXS,
    marginRight: tokens.spacingHorizontalXS,
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalXXL,
  },
});
