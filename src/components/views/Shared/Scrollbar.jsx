import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ScrollBar extends Component {
  constructor() {
    super();
    this.state = {
      height: null,
    };
  }

  componentDidMount() {
    this.getWindowHeight();
  }

  componentWillUnmount() {
    this.setState({
      height: null,
    });
  }

  getWindowHeight = () => {
    window.addEventListener('resize', () => {
      this.setState({
        height: window.innerHeight,
      });
    });
    this.setState({
      height: window.innerHeight,
    });
  };

  render() {
    return (
      <Scrollbars
        renderThumbVertical={() => <div className="custom-scrollbar" />}
        autoHeight
        autoHeightMin={this.state.height}
        {...this.props}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
