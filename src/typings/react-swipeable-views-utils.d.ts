
declare module "react-swipeable-views-utils" {
  import { ComponentType } from "react";
  import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views"
  type VirtualizeProps = {
    overscanSlideAfter?: number
    overscanSlideBefore?: number
    slideCount?: number
    slideRenderer: (x: { key: number, index: number }) => React.ReactElement 
  }

  export const virtualize:
    <T extends SwipeableViewsProps>(Component: ComponentType<T>) =>
      React.ComponentType<VirtualizeProps & T>
}