import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import MapComponent from "./MapComponent";
import { Row, Col, Drawer } from "antd";

const API_ONE = "http://frnt.c4c.codes/gettoken";
const API_TWO = "http://frnt.c4c.codes/available_rooms_listing";
const API_THREE = "http://frnt.c4c.codes/listing";

function InputComponent() {
  // state
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [data, setData] = useState({
    location: [],
    no_of_adults: 1,
    no_of_rooms_needed: 1,
    no_of_child: 0,
    checkin: "",
    checkout: "",
  });
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClick = (e) => {
    let latitude = e.latLng.lat();
    let longtitude = e.latLng.lng();
    setCenter({ lat: latitude, lng: longtitude });
  };

  // Drawer
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Generate Token
  async function tokenGenerate() {
    const res = axios.get(`${API_ONE}`);
    const token = res.data.token;
    setToken(token);
  }

  useEffect(() => {
    tokenGenerate();
  }, []);

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${API_TWO}`,
      headers: {
        "x-access-tokens": token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <Row justify="center">
      <Col span={10}>
        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid black",
            padding: 40,
          }}
        >
          <label for="city">Enter City</label>
          <br />
          <input
            id="city"
            placeholder="Enter City"
            name="location"
            value={center.lat > 0 ? [center.lat, center.lng] : data.location}
            onChange={handleChange}
          />
          <p style={{ marginTop: 20 }}>OR</p>

          <p style={{ color: "blue", cursor: "pointer" }} onClick={showDrawer}>
            Choose the location in a map
          </p>

          {/* Start Date */}
          <label for="startDate">Start Date</label>
          <br />
          <input
            type="date"
            id="startDate"
            name="checkin"
            value={data.checkin}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* End Date */}
          <label for="endDate">End Date</label>
          <br />
          <input
            type="date"
            name="checkout"
            value={data.checkout}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* Adult */}
          <label for="adult">No. of Adult</label>
          <br />
          <input
            id="adult"
            type="number"
            name="no_of_adults"
            value={data.no_of_adults}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* Rooms */}
          <label for="rooms">No. of Rooms</label>
          <br />
          <input
            id="rooms"
            type="number"
            name="no_of_rooms_needed"
            value={data.no_of_rooms_needed}
            onChange={handleChange}
          />

          <br />
          <br />

          {/* Child */}
          <label for="child">No. of Child</label>
          <br />
          <input
            id="child"
            type="number"
            name="no_of_child"
            value={data.no_of_child}
            onChange={handleChange}
          />
          <br />
          <br />

          <button type="submit">Search</button>
        </form>
      </Col>

      <Drawer
        title="Select Location on Map"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={1000}
      >
        <MapComponent center={center} handleClick={handleClick} />
      </Drawer>
    </Row>
  );
}

export default InputComponent;
