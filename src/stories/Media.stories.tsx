import { Media, MediaProps } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Media",
  component: Media,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<MediaProps>;

export default meta;
type Story = StoryObj<MediaProps>;

export const Image: Story = {
  args: {
    mediaMimeType: "image/jpg",
    mediaUrl: "https://via.placeholder.com/150",
    isDetail: true,
  },
};

export const Video: Story = {
  args: {
    mediaMimeType: "video/mp4",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    autoPlay: true,
    isDetail: true,
  },
}

export const Audio: Story = {
  args: {
    mediaMimeType: "audio/mp3",
    mediaUrl: "https://www.w3schools.com/html/horse.mp3",
    isDetail: true,
  },
}

export const Iframe: Story = {
  args: {
    mediaMimeType: "iframe",
    mediaUrl: "https://meteor.computer/",
    isDetail: true,
  },
}