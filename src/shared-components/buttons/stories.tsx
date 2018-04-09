import React from "react"
import { storiesOf } from "@storybook/react"
import * as k from "@storybook/addon-knobs"
import { Button, ButtonDirection, ButtonColor } from "./index"
import { action } from "@storybook/addon-actions"
import { CheckIcon, RejectIcon } from "../icons";

storiesOf("Button", module)
  .add("Accept", () => (
    <Button
      label={k.text("lable", "Click me")}
      color={ButtonColor.Green}
      icon={<CheckIcon />}
      direction={ButtonDirection.Left}
      onClick={action("click")}
    />
  ))
  .add("Reject", () => (
    <Button
      label={k.text("lable", "Don't click me")}
      color={ButtonColor.Red}
      icon={<RejectIcon />}
      direction={ButtonDirection.Right}
      onClick={action("click")}
    />
  ))