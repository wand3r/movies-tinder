import React, { SFC } from "react"
import cn from "classnames"
import "./style.scss"

export enum ButtonDirection {
  Left = "left",
  Right = "right",
}

export enum ButtonColor {
  Green = "green",
  Red = "red",
}

type ButtonProps = { 
  label: string
  icon?: JSX.Element
  direction: ButtonDirection
  color: ButtonColor
  onClick: () => void
}

export const Button: SFC<ButtonProps> =
  ({ label, icon, direction, color, onClick }) => (
    <div
      className={`btn btn--color-${color} btn--direction-${direction}`}
      onClick={onClick}
    >
      {icon &&
        <div className="btn__icon">
          {icon}
        </div>}
      <div className="btn__label">
        {label}
      </div>
    </div>  
  );
