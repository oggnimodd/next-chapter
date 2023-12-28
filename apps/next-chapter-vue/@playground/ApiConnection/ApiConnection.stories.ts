import type { Meta, StoryObj } from "@storybook/vue3";

import ApiConnection from "./ApiConnection.vue";

const meta = {
  title: "Auth/ApiConnection",
  component: ApiConnection,
} satisfies Meta<typeof ApiConnection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestApiConnection: Story = {};
