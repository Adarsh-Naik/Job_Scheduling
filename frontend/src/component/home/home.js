import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="maindiv w-full p-20">
      <section class="text-gray-700 body-font">
  <div class=" combinediv container mx-auto flex px-5 pl-10 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
        <br class="hidden lg:inline-block"/>readymade gluten
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <Link to="/services" class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Get Started</Link>
        
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src="https://img.freepik.com/free-photo/majestic-cheetah-staring-into-sunset-beauty-generated-by-ai_188544-34630.jpg"/>
    </div>
  </div>
</section>
    </div>
  )
}

export default Home
