import React from "react";
import './Sticker.css';

export default class Sticker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (typeof this.props.action !== 'function') {
      return (
        <div className={"the-story-sticker " + this.props.className}>
          {this.props.children}
        </div>
      );
    } else {
      return (<div className={"the-story-sticker the-story-sticker-click-able " + this.props.className} 
        onClick={this.props.action}>
        {this.props.children}
      </div>);
    }
  }
}
