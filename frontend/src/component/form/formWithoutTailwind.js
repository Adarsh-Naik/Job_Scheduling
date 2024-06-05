import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Form = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");
  const [tahsil, setTahsil] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [datetime, setDatetime] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/sendformdata", {
        name,
        mobile,
        district,
        tahsil,
        village,
        pincode,
        area,
        datetime,
      });
      alert("Your Job is Accepted!");
      history.push(`/success/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form method="post" action="/done">
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            required
          />
          <label>Full Name</label>
        </div>
        <div>
          <input
            type="number"
            name="mobile"
            onChange={(e) => setMobile(e.target.value)}
            placeholder=""
            required
          />
          <label>Mobile Number</label>
        </div>

        <div>
          <select
            id="underline_select"
            type="text"
            name="district"
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option selected>Choose Your District</option>
            <option value="US">United States</option>
          </select>
          <label>Select District</label>
        </div>
        <div>
          <select
            id="underline_select"
            type="text"
            name="tahsil"
            onChange={(e) => setTahsil(e.target.value)}
            required
          >
            <option selected>Choose Your Tahsil</option>
            <option value="US">United States</option>
          </select>
          <label>Select Tahsil</label>
        </div>
        <div>
          <select
            id="underline_select"
            type="text"
            name="village"
            onChange={(e) => setVillage(e.target.value)}
            required
          >
            <option selected>Choose Your Village</option>
            <option value="US">United States</option>
          </select>
          <label for="underline_select">Select Village</label>
        </div>
        <div>
          <input
            type="number"
            name="pincode"
            onChange={(e) => setPincode(e.target.value)}
            placeholder=""
            required
          />
          <label
          >
            Pincode
          </label>
        </div>
        <div>
          <input
            type="number"
            name="area"
            onChange={(e) => setArea(e.target.value)}
            placeholder=""
            required
          />
          <label
          >
            Total Area
          </label>
        </div>

        <div>
          <label
          >
            Select Date
          </label>
          <input
            type="datetime-local"
            name="datetime"
            onChange={(e) => setDatetime(e.target.value)}
            placeholder=""
            required
          />
        </div>

        <input
          type="submit"
          onClick={submit}
          value="Submit"
        ></input>
      </form>
    </div>
  );
};

export default Form;
