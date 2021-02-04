import React from "react";

import { Table } from 'react-bootstrap';

import './Contact.css';
export default class Contact extends React.Component {
  render() {
    return (
      <div className={"the-story-contact-space"}>
      <h1>コンタクト</h1>
          If you would like to report bug or know further more.
          contact below.
        <Table className={"the-story-contact-table"} striped bordered hover responsive>
          <tbody>
            <tr>
              <th>project leader name</th>
              <td>mizikanikyuuri</td>
            </tr>
            <tr>
              <th>github</th>
              <td>https://github.com/mizikanikyuuri/theStory</td>
            </tr>
          </tbody>
        </Table>

      </div >
    );
  }
}
