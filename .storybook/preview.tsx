import React from "react";
import type { Preview } from "@storybook/react";
import { GlobalLayout } from "./GlobalLayout";

const preview: Preview = {
  decorators: [
    Story => (
      <GlobalLayout>
        <Story />
      </GlobalLayout>
    )
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
