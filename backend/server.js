// openCageData Geocoding Api key : b58bd3ca202d461698e15dc2d75cb3fd
// forward geocoding URL : https://api.opencagedata.com/geocode/v1/json?q=Frauenplan+1%2C+99423+Weimar%2C+Germany&key=YOUR-API-KEY

// MIX : https://api.opencagedata.com/geocode/v1/json?q=Frauenplan+1%2C+99423+Weimar%2C+Germany&key=b58bd3ca202d461698e15dc2d75cb3fd

// openrouteservices.org:=> https://api.openrouteservice.org/v2/directions/driving-car/geojson?api_key=${apiKey}
// keyForRouteOptimizationApi_OpenRouteServices:  5b3ce3597851110001cf624876a6aeb34ebc40a396e695e89f6a13e4

// MIX : https://api.openrouteservice.org/v2/directions/driving-car/geojson?api_key=5b3ce3597851110001cf624876a6aeb34ebc40a396e695e89f6a13e4

// Import necessary modules
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser"); // Import body-parser
const Formdata = require("./models/Formdata"); // Import the Formdata model
const findBestRoute  = require("./optimalRoute");
// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB database
const MONGODB_URI = "mongodb://127.0.0.1:27017/jobScheduling";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connected successfully");
});

// Route to get all form data
app.get("/formData", async (req, res) => {
  try {
    const formData = await Formdata.find({});
    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle DELETE requests to delete a specific form data entry
app.delete("/formdata/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedFormData = await Formdata.findByIdAndDelete(id);
    if (!deletedFormData) {
      return res.status(404).json({ message: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update form data
app.put("/formdata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await Formdata.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get the latest form data entry
app.get("/latestFormData", async (req, res) => {
  try {
    const latestFormData = await Formdata.findOne().sort({ _id: -1 });
    res.json(latestFormData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  password: String,
});

// Create User model
const User = new mongoose.model("User", userSchema);


app.post("/sendformdata", async (req, res) => {
  const { name, mobile, district, tahsil, village, pincode, area, date } =
    req.body;

  // Construct the address string
  const address = `${village}, ${tahsil}, ${district}, ${pincode}, India`;

  // Geocode the address
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=b58bd3ca202d461698e15dc2d75cb3fd`;

  request({ url: geocodeUrl, json: true }, async (error, response) => {
    if (error) {
      console.error("Error geocoding address:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      if (response.body.results && response.body.results.length > 0) {
        const newUserLocation = [
          response.body.results[0].geometry.lng,
          response.body.results[0].geometry.lat,
        ];

        // Fetch all documents for the selected date from the database
        const userLocations = await Formdata.find({ date }).lean();

        // Define start and end points
        const startPoint = [78.1208, 20.3888];
        const endPoint = [78.1208, 20.3888];

        // Initialize waypoints array with start point
        const waypoints = [startPoint];

        // Add waypoints from the database
        waypoints.push(
          ...userLocations.map((location) => location.coordinates)
        );

        // Add new user location to waypoints array
        waypoints.push(newUserLocation);

        // Add end point to waypoints array
        waypoints.push(endPoint);

        console.log(waypoints);
        let citiesToCover = waypoints.length - 2;
        // console.log(citiesToCover);

        // Extract all "area" fields from documents with the selected date
        let areas = userLocations.map((location) => location.area);
        
        let area_int = parseInt(area);
        let total_area_to_spray = 0;
        areas.push(area_int);
        console.log("Areas:",areas);
        // console.log("total area to spray of new location only:",total_area_to_spray);
        console.log("length of area array:",areas.length);
        let sum = 0;
        for (let i = 0; i < areas.length; i++) {
          sum += areas[i];
        }

        total_area_to_spray = sum;

        console.log("total area to spray : ",total_area_to_spray);

        let total_spray_time = total_area_to_spray * 10;

        console.log("total spray time : ",total_spray_time);

        let total_setup_time = citiesToCover * 20;

        console.log("total setup time : ", total_setup_time );

        findBestRoute(waypoints)
          .then(({ distance, geometry }) => {
            console.log("Distance (km):", distance," km");
            console.log("Route Geometry:", geometry);
            // Display route on map or perform further processing
            let total_travel_time = distance;
            console.log("total travel time: ",total_travel_time);

            let total_time = total_setup_time + total_spray_time + total_travel_time;

            console.log("total time :",total_time);

            const one_day_time_limit = 500;
            if (total_time < one_day_time_limit) {
              // Save form data including coordinates to the database
              Formdata.create({
                name,
                mobile,
                district,
                tahsil,
                village,
                pincode,
                area,
                date,
                coordinates: newUserLocation, // Save coordinates as an array
              }).then(() => {
                console.log("Form data saved successfully");
                res.status(200).json({ message: "Form data saved successfully" });
              }).catch((error) => {
                console.error("Error saving form data:", error);
                res.status(500).json({ error: "Internal Server Error" });
              });
            } else {
              // Display a warning if the selected date is packed
              console.log("Please select another date, this date is packed.");
              res.status(400).json({ error: "Please select another date, this date is packed." });
            }
          })
          .catch((error) => {
            console.error("Error:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
          });

      } else {
        console.error("No results found for geocoding request");
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (e) {
      console.error("Error saving form data:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Route to handle user registration
app.post("/register", async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ mobile: mobile });

    if (existingUser) {
      return res.send({ message: "User already registered" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    res.send({ message: "Successfully registered. Please login." });
  } catch (error) {
    console.error(error);
    res.send({
      error: "Internal server error",
      message: "Something went wrong on the server",
    });
  }
});

// Route to handle user login
app.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile: mobile });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Incorrect Password" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.send({
      error: "Internal server error",
      message: "Something went wrong on the server",
    });
  }
});

// Route to handle deleting the last form data entry
app.delete("/deleteLatestFormData", async (req, res) => {
  try {
    // Find the last form data entry and delete it
    const latestFormData = await Formdata.findOneAndDelete().sort({ _id: -1 });
    res.json(latestFormData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
