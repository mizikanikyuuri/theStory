import React from "react";

import { Table } from 'react-bootstrap';

export default class Contact extends React.Component {
  render() {
    return (
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>project leader name</th>
            <td>mizikanikyuuri</td>
          </tr>
          <tr>
            <th>email</th>
            <td>will_write@yagle.com</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
