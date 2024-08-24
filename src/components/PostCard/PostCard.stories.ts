import type { Meta, StoryObj } from "@storybook/react";
import PostCard from "./PostCard";

const meta = {
 title: "App/PostCard",
 component: PostCard,
 parameters: {
   layout: "centered",
 },
 tags: ["autodocs"],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
 args: {
   post: {
     id: 1,
     title: "Post 1",
     description: "Lorem ipsum dolor sit amet.",
   },
 },
};
