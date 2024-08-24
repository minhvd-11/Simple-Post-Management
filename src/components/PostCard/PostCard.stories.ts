import type { Meta, StoryObj } from "@storybook/react";
import PostCard from "./PostCard";
import { fn } from "@storybook/test";

const meta = {
  title: "App/PostCard",
  component: PostCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    handleEditPost: fn(),
    handleAfterSuccess: fn(),
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      id: 1,
      title: "Post 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    },
  },
};
