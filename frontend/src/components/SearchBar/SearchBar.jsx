import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function SearchBar(){
    const Searchbar = (props) => {
        console.log("searchined");
        props.setRefresh(1)
    };
    return (
        <Form>
        <FormGroup>
            <Label for="EmployeeSearch"></Label>
            <Input
            type="search"
            name="input"
            onChange={(e) => "idk"}
            placeholder="Search Employees"
            />
        </FormGroup>
        </Form>
    );
}

const getTemperatureSearch = async () => {
    const response = await fetch(
      "/v1/api/temperature?wristId=00:20:08:00:1A:C1" // Hardcoded for March 1 9AM - march 15 9PM (i.e 2 weeks)
    );
    const data = await response.json();
    setbluetoothData(data);
  };

export default SearchBar;