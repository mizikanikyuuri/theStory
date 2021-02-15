import React from "react";
import './MainContent.css';
export default class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
    };
  }
  render() {
    return (
      <div className="home-content container-fluid">
        {this.state.children}
      </div>
    )
  }
}
