import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./success.css";

const Success = () => {
  const [formData, setFormData] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/latestFormData"
        );
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFormData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8000/deleteLatestFormData");
      history.push("/services");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
                Date Chosen
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {formData.name}
              </th>
              <td class="px-6 py-4">{formData.mobile}</td>
              <td class="px-6 py-4">{formData.district}</td>
              <td class="px-6 py-4">{formData.tahsil}</td>
              <td class="px-6 py-4">{formData.village}</td>
              <td class="px-6 py-4">{formData.pincode}</td>
              <td class="px-6 py-4">{formData.area}</td>
              <td class="px-6 py-4">{formData.date}</td>

              <td class="px-6 py-4 text-right">
                <Link
                  to="/services"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={handleDelete}
                >
                  Withdraw My Request
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <Link
          to="/home"
          class=" block mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
        >
          Done! Go To Home Page
        </Link>
      </div>
      
    </div>
  );
};

export default Success;
