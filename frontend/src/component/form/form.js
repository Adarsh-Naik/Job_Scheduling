import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import tahsilVillageMapping from "./tahsilVillageMapping";

const Form = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("Yavatmal");
  const [tahsil, setTahsil] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const history = useHistory();

  const handleTahsilChange = (e) => {
    setTahsil(e.target.value);
    setVillage(""); // Reset village when tahsil changes
  };

  const submit = async (e) => {
    e.preventDefault();

    // Get today's date
    const today = new Date();
    const selectedDate = new Date(date);

    // Check if the selected date is a back date
    if (selectedDate < today) {
      // Display a warning if the selected date is a back date
      alert("Please select a date from today onwards.");
      return; // Exit the function without submitting the form
    }

    // Check if the area is less than 30
    if (parseInt(area) < 30) {
      try {
        const response = await axios.post(
          "http://localhost:8000/sendformdata",
          {
            name,
            mobile,
            district,
            tahsil,
            village,
            pincode,
            area,
            date,
          }
        );
        alert("Your Job is Accepted!");
        history.push(`/success/${response.data._id}`);
      } catch (error) {
        console.log(error);
        // Display an alert if the form data is not saved in the database
        alert("Select Another Date, this date is packed.");
      }
    } else {
      // Display an alert if the area exceeds 30
      alert("Your area is exceeding. Please enter an area less than 30.");
    }
  };

  return (
    <div className="block w-80">
      <form class="block max-w-md mx-auto " method="post" action="/done">
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            for="floating_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Full Name
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="mobile"
            onChange={(e) => setMobile(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            for="floating_mobile"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mobile Number
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <select
            id="underline_select"
            type="text"
            name="district"
            onChange={(e) => setDistrict(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-zinc-600 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-500 dark:border-zinc-800 focus:outline-none focus:ring-0 focus:border-zinc-800 peer"
            required
          >
            <option selected>Choose Your District</option>
            <option value="Yavatmal">Yavatmal</option>
          </select>
          <label
            for="underline_select"
            class="sr-only peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Select District
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <select
            id="underline_select"
            type="text"
            name="tahsil"
            // onChange={(e) => setTahsil(e.target.value)}
            onChange={handleTahsilChange}
            class="block py-2.5 px-0 w-full text-sm text-zinc-600 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-500 dark:border-zinc-800 focus:outline-none focus:ring-0 focus:border-zinc-800 peer"
            required
          >
            <option value="" disabled selected>
              Choose Your Tahsil
            </option>
            {/* Populate tahsil options based on selected district */}
            {Object.keys(tahsilVillageMapping).map((tahsil) => (
              <option key={tahsil} value={tahsil}>
                {tahsil}
              </option>
            ))}
          </select>
          <label
            for="underline_select"
            class="sr-only peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Select Tahsil
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <select
            id="underline_select"
            type="text"
            name="village"
            onChange={(e) => setVillage(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-500 dark:border-zinc-800 focus:outline-none focus:ring-0 focus:border-zinc-800 peer"
            required
            disabled={!tahsil}
          >
            <option value="" disabled selected>
              Choose Your Village
            </option>
            {/* Populate village options based on selected tahsil */}
            {tahsilVillageMapping[tahsil] &&
              tahsilVillageMapping[tahsil].map((village) => (
                <option key={village} value={village}>
                  {village}
                </option>
              ))}
          </select>
          <label
            for="underline_select"
            class="sr-only peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Select Village
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="pincode"
            onChange={(e) => setPincode(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            for="floating_pincode"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pincode
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="area"
            onChange={(e) => setArea(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            for="floating_area"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Total Area in Acres
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <label
            for="floating_date"
            class="peer-focus:font-medium absolute text-sm text-gray-500 "
          >
            Select Date
          </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            class="block pt-5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
        </div>

        <input
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={submit}
          value="Submit"
        ></input>
      </form>
    </div>
  );
};

export default Form;
