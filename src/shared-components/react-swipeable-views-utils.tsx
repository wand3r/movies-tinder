import React, { Component, ComponentType } from "react";
import { SwipeableViewsProps } from "react-swipeable-views";

export const disableBackSwipe = <TOriginalProps extends SwipeableViewsProps>(Comp: ComponentType<TOriginalProps>) =>
  class extends Component<TOriginalProps, { index: number }> {
    static getDerivedStateFromProps = (nextProps: TOriginalProps, prevState: { index: number }) =>
      nextProps.index !== prevState.index
        ? { index: nextProps.index} 
        : null

    state = {
      index: this.props.index!, 
    }

    render() {
      const { onChangeIndex } = this.props
      const { index } = this.state
      return ( 
        <Comp
          {...this.props}
          index={this.state.index}
          onChangeIndex={(index) => {
            const oldIndex = this.state.index;
            this.setState({
              index,
            }, () => {
              if (index < oldIndex) {
                this.setState({
                  index: oldIndex,
                });
              } else {
                onChangeIndex && onChangeIndex(index, 0);
              }
            });
          }}
        />
      )
    }
  }