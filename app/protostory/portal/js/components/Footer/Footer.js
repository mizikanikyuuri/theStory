import React from "react";

import { Button } from 'react-bootstrap';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-button-section">
          <Button variant="primary">facebook</Button>{' '}
          <Button variant="primary">twitter</Button>{' '}
          <Button variant="primary">discord</Button>{' '}
        </div>
      </footer>
    );
  }
}
