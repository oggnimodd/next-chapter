import type { Meta, StoryObj } from "@storybook/vue3";

import Login from "./Login.vue";

const meta = {
  title: "Auth/Login",
  component: Login,
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Auth: Story = {};
