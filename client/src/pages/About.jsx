import React from "react";

const About = () => {
  return (
    <div className="font-serif leading-relaxed bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* Header Section */}
      <header className="text-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-16 shadow-lg">
        <h1 className="text-6xl font-bold tracking-wide">Welcome to GD-Groups</h1>
        <p className="text-lg mt-4 font-light italic">
          Your trusted platform for finding rental houses and stays
        </p>
      </header>

      {/* Main Content */}
      <main className="px-8 py-16">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* About Us Section */}
          <section className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 p-10 shadow-xl rounded-lg border-t-4 border-blue-900">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">About Us</h2>
            <div className="text-lg text-gray-700 space-y-6">
              <p>
                At <span className="font-bold text-blue-600">GD-Groups</span>, we are
                dedicated to helping you find the ideal rental property that complements your
                lifestyle. Whether you're looking for a spacious house, a cozy apartment, or
                a short-term stay, we simplify your search with our seamless and efficient
                platform.
              </p>
              <p>
                Our diverse collection of rental properties is designed to suit various
                preferences and budgets. From{" "}
                <span className="font-medium text-blue-600">single-bedroom apartments</span> to{" "}
                <span className="font-medium text-blue-600">luxurious family homes</span>, we ensure that
                you’ll find a place that feels like home.
              </p>
              <div className="bg-teal-50 border-l-4 border-blue-600 p-4 italic text-black rounded-md">
                <p>
                  "At GD-Groups, your dream home is just a click away. Our mission is to make
                  renting effortless and enjoyable."
                </p>
              </div>
              <p>
                Thank you for choosing GD-Groups as your trusted partner in finding your next
                home. Let us help you turn your housing aspirations into reality.
              </p>
            </div>
          </section>

          {/* Query Section */}
          <section className="flex-1 bg-gray-50 p-10 shadow-xl rounded-lg border-t-4 border-gray-400">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">Have a Question or Query?</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="p-4 text-base border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-4 text-base border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <textarea
                id="message"
                className="w-full border border-gray-300 rounded-lg p-4 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Type your message here..."
                rows="6"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gold-600 text-white py-3 rounded-lg shadow-md hover:bg-gold-700 transition-all font-medium"
              >
                Submit
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Social Media Section */}
      <footer className="py-8 bg-gradient-to-r from-gray-800 to-gray-900 text-center">
        <div className="text-lg font-medium mb-4 text-white">Connect with us:</div>
        <div className="flex justify-center gap-6 mb-4">
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-cover rounded-full shadow-md hover:shadow-lg transition-all"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png')",
            }}
          ></a>
          {/* Gmail */}
          <a
            href="mailto:contact@gd-groups.com"
            className="w-12 h-12 bg-cover rounded-full shadow-md hover:shadow-lg transition-all"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png')",
            }}
          ></a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-cover rounded-full shadow-md hover:shadow-lg transition-all"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png')",
            }}
          ></a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-cover rounded-full shadow-md hover:shadow-lg transition-all"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg')",
            }}
          ></a>
        </div>
        <p className="text-gray-300 text-sm">
          © 2024 <span className="font-bold">GD-Groups</span>. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
