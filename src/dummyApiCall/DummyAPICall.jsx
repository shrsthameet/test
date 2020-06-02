import React from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";

function DummyAPICall() {
  const [person, setPerson] = useState({
    name: "",
    salary: "",
    age: "",
  });
  // const [profile, setProfile] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(person.name, person.salary, person.age);
    axios({
      method: "post",
      url: "http://dummy.restapiexample.com/api/v1/create",
      data: {
        name: person.name,
        salary: person.salary,
        age: person.age,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Hello from demo app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={person.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="salary"
          value={person.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          value={person.age}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DummyAPICall;
