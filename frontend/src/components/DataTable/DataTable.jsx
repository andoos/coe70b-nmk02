import React from "react";

import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

function DataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Simple Table</CardTitle>
      </CardHeader>
      <CardBody>
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th className="text-center">Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dakota Rice</td>
              <td>Niger</td>
              <td>Oud-Turnhout</td>
              <td className="text-center">$36,738</td>
            </tr>
            <tr>
              <td>Minerva Hooper</td>
              <td>Curaçao</td>
              <td>Sinaai-Waas</td>
              <td className="text-center">$23,789</td>
            </tr>
            <tr>
              <td>Sage Rodriguez</td>
              <td>Netherlands</td>
              <td>Baileux</td>
              <td className="text-center">$56,142</td>
            </tr>
            <tr>
              <td>Philip Chaney</td>
              <td>Korea, South</td>
              <td>Overland Park</td>
              <td className="text-center">$38,735</td>
            </tr>
            <tr>
              <td>Doris Greene</td>
              <td>Malawi</td>
              <td>Feldkirchen in Kärnten</td>
              <td className="text-center">$63,542</td>
            </tr>
            <tr>
              <td>Mason Porter</td>
              <td>Chile</td>
              <td>Gloucester</td>
              <td className="text-center">$78,615</td>
            </tr>
            <tr>
              <td>Jon Porter</td>
              <td>Portugal</td>
              <td>Gloucester</td>
              <td className="text-center">$98,615</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default DataTable;
