const request = require("request");
// optimalRoute.js
import('node-fetch')
  .then(fetch => {
    // Use fetch here
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

async function findBestRoute(coordinates) {
  const url = `http://router.project-osrm.org/route/v1/driving/${coordinates.join(';')}?overview=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }
    const data = await response.json();
    const distance = data.routes[0].distance / 1000; // Distance in kilometers
    const geometry = data.routes[0].geometry; // Polyline geometry of the route
    return { distance, geometry };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = findBestRoute;

