import { addons } from "storybook/manager-api";

import { lightTheme } from "./themes";

/**
 * Storybook manager UI configuration
 * Applies custom theme to the manager (sidebar, toolbar, etc.)
 */
addons.setConfig({
  theme: lightTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ["other"],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
