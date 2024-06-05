import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    mobile: "",
    password: "",
  });

  const [adminToken, setAdminToken] = useState(""); // State to hold admin token

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post("http://localhost:8000/login", user)
      .then((res) => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        history.push(`/home`);
      })

      .catch((error) => {
        console.error(error.response.data.message);
        // Handle registration error
      });
  };

  const verifyToken = () => {
    if (adminToken === "ram") {
      // If token is "ram", redirect to Details page
      history.push(`/details`);
    } else {
      alert("Invalid token"); // Show alert for invalid token
    }
  };


  return (
    <div>
      <div className="login">
        {console.log(user)}
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="mobile"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            value={user.mobile}
            onChange={handleChange}
          />
          <label
            for="floating_mobile"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mobile Number
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            value={user.password}
            onChange={handleChange}
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="text-center">
          <input
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={login}
            value="Login"
          ></input>
        </div>
      </div>
      <div>
        <h3 className="mt-2">Do not have an account?</h3>
        <div className="mt-4">
          <Link
            to="/register"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </Link>
        </div>
        <div className="mt-4">
          An Admin?
          <div class="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="password"
              id="adminToken"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              value={adminToken}
              onChange={(e)=>setAdminToken(e.target.value)}
            />
            <label
              htmlFor="adminToken"
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              
            >
              Token
            </label>
          </div>
          <div className="text-center">
            <input
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={verifyToken}
            value="Verify" 
          ></input>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
