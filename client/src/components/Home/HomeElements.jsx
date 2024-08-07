import React from "react";
import BannerElements from "./BannerElements";

const HomeElements = () => {
  return (
    <div>
      <div className="text-font font-roboto">
        {/* Hero Section */}

        {/* About Section */}
        <section className="py-16 px-8 bg-[#1E3A8A] text-center">
          <h2 className="text-4xl font-orbitron mb-4">About Nebula Logs</h2>
          <p className="text-xl leading-relaxed">
            Nebula Logs is your ultimate daily logging platform, inspired by the
            mysteries and beauty of the cosmos. Join us in exploring the
            universe, one log at a time.
          </p>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8 text-center">
          <h2 className="text-4xl font-orbitron mb-8">Features</h2>
          <div className="flex flex-wrap justify-around">
            <div className="bg-[#7C3AED] p-8 m-4 w-full md:w-1/3 rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl mb-4">Futuristic Design</h3>
              <p>
                Experience a sleek, modern interface that transports you to the
                future.
              </p>
            </div>
            <div className="bg-[#7C3AED] p-8 m-4 w-full md:w-1/3 rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl mb-4">Interactive Elements</h3>
              <p>
                Engage with dynamic hover effects, parallax scrolling, and
                smooth transitions.
              </p>
            </div>
            <div className="bg-[#7C3AED] p-8 m-4 w-full md:w-1/3 rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl mb-4">Visual Storytelling</h3>
              <p>
                Enhance your logs with stunning images and graphics that tell
                your story.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 px-8 bg-[#1E3A8A] text-center">
          <h2 className="text-4xl font-orbitron mb-4">Get Started</h2>
          <p className="text-xl mb-8">
            Begin your journey with Nebula Logs today and start logging your
            cosmic adventures.
          </p>
          <button className="bg-[#EC4899] text-[#F9FAFB] py-4 px-8 text-xl rounded-lg transition-colors duration-300 hover:bg-[#C026D3]">
            Sign Up Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomeElements;
