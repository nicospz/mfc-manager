import React from "react";
import Button, { ButtonProps } from "./";
import type { StoryFn } from "@storybook/react";

export default {
    title: "Components/Button",
    component: Button,
};

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: "Click me!",
} as const;

