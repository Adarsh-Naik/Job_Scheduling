import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Details = () => {
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get("http://localhost:8000/formdata")
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/formdata/${id}`)
      .then((response) => {
        console.log("Form data deleted successfully:", response.data);
        // After deleting, update the form data by fetching it again
        axios
          .get("http://localhost:8000/formdata")
          .then((response) => {
            setFormData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching form data after deletion:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting form data:", error);
      });
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const selectedData = formData.find((data) => data._id === id);
    setEditedData(selectedData);
    setShowModal(true); // Show the modal when edit button is clicked
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:8000/formdata/${editingId}`, editedData)
      .then((response) => {
        console.log("Form data updated successfully:", response.data);
        setEditingId(null);
        setShowModal(false); // Hide the modal after saving changes
        // After editing, update the form data by fetching it again
        axios
          .get("http://localhost:8000/formdata")
          .then((response) => {
            setFormData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching form data after editing:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating form data:", error);
      });
  };

  const filteredFormData = formData.filter((data) => {
    return (
      (data.name &&
        data.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (data.mobile && data.mobile.toString().includes(searchQuery)) ||
      (data.district &&
        data.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (data.tahsil &&
        data.tahsil.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (data.village &&
        data.village.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (data.pincode && data.pincode.toString().includes(searchQuery)) ||
      (data.area && data.area.toString().includes(searchQuery)) ||
      (data.date && data.date.includes(searchQuery))
    );
  });

  return (
    <div id="main" className="static text-black">
      <div id="logoutButton" className=" ">
        <Link
          to="/login"
          type="button"
          className="absolute w-32 start-10 top-8 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Logout
        </Link>
      </div>
    
      <h1 class="absolute start-60 top-4 mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
        <span class="static text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Welcome Admin!
        </span>{" "}
        PathFinder__
      </h1>
      <div class="absolute top-5 end-16 w-48 z-0 mb-5 group">
        <label
          for="floating_date"
          class="peer-focus:font-medium absolute text-lg text-green-500 "
        >
          Select Date
        </label>
        <input
          type="date"
          name="date"
          // onChange={(e) => setdate(e.target.value)}
          class="block mt-2 pt-5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
        />
      </div>
      <div id="logoutButton" className=" ">
        <Link
          to="/details"
          type="button"
          className="absolute w-48 end-16 top-28 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Get The Path
        </Link>
      </div>
      {/* Modal Overlay */}
      {showModal && (
        <div className="relative z-10  overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity " aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative  w-80 h-100  bg-zinc-400 rounded-lg p-5">
            {/* Edit Form */}
            <form className="">
              {/* Input fields for editing data */}
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="mobile"
                value={editedData.mobile}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="district"
                value={editedData.district}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="tahsil"
                value={editedData.tahsil}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="village"
                value={editedData.village}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="number"
                name="pincode"
                value={editedData.pincode}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="number"
                name="area"
                value={editedData.area}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="date"
                name="date"
                value={editedData.date}
                onChange={handleEditChange}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              {/* Add input fields for other properties */}
              <button
                onClick={handleEditSubmit}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Table */}
      <div class="absolute top-32 start-10 overflow-x-auto sm:rounded-lg">
        <input
          type="text"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <br />
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Mobile
                </th>
                <th scope="col" class="px-6 py-3">
                  District
                </th>
                <th scope="col" class="px-6 py-3">
                  Tahsil
                </th>
                <th scope="col" class="px-6 py-3">
                  Village
                </th>
                <th scope="col" class="px-6 py-3">
                  Pincode
                </th>
                <th scope="col" class="px-6 py-3">
                  Area
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFormData.map((data) => (
                <tr
                  key={data._id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.name}
                  </th>
                  <td class="px-6 py-4">{data.mobile}</td>
                  <td class="px-6 py-4">{data.district}</td>
                  <td class="px-6 py-4">{data.tahsil}</td>
                  <td class="px-6 py-4">{data.village}</td>
                  <td class="px-6 py-4">{data.pincode}</td>
                  <td class="px-6 py-4">{data.area}</td>
                  <td class="px-6 py-4">{data.date}</td>
                  <td class="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(data._id)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <h1> </h1>
                    <button
                      onClick={() => handleDelete(data._id)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
