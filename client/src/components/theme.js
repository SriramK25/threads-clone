// UI LIBRARY
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// EXTEND CONFIGURATION
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// EXTEND STYLES
const styles = {
  global: (props) => ({
    body: {
      // Text color : Dark gray on light mode & White on Dark mode
      color: mode("gray.800", "whiteAlpha.900")(props),

      // Background color : Light gray on Light mode & Dark gray on Dark mode
      bg: mode("gray.100", "#1e1e1e")(props),
    },
  }),
};

// EXTEND COLORS
const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

// SAVE EXTENDED SETTINGS TO THEME
const theme = extendTheme({ config, styles, colors });

export default theme;
