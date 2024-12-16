import React from 'react';

const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-100 leading-relaxed">
      {/* Header Section */}
      <header className="text-center bg-gray-200 shadow-gray-700 py-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to GD-Groups</h1>
        <p className="text-lg text-gray-600 mt-2">Your trusted platform for finding rental houses and stays</p>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="flex gap-12">
          {/* About Us Section */}
          <section className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
            <p className="text-base text-gray-700 mb-4">
              At GD-Groups, we are committed to helping you find the perfect rental property that suits your lifestyle. Whether you're searching for a spacious house to rent, a cozy apartment, or a short-term stay, we make the process easy and efficient.
            </p>
            <p className="text-base text-gray-700 mb-4">
              Our platform offers a wide range of properties tailored to meet your preferences, making your search stress-free. With a user-friendly interface and a diverse selection of homes, GD-Groups is your trusted partner in finding the ideal place to call home. Let us help you turn your dream home into a reality!
            </p>
            <p className="text-base text-gray-700 mb-4">
              We pride ourselves on offering a diverse range of options for all kinds of renters. Whether you're looking for a single-bedroom apartment or a larger family home, our collection of properties caters to all kinds of preferences and budgets. Our goal is to help you find a property that not only meets your needs but exceeds your expectations.
            </p>
            <p className="text-base text-gray-700 mb-4">
              Thank you for choosing GD-Groups as your trusted partner in finding your next home. We look forward to helping you discover the perfect place that fits your lifestyle and preferences. Our mission is to make the renting process simple, efficient, and enjoyable for you.
            </p>
          </section>

          {/* Query Section */}
          <section className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Have a Question or Query?</h2>
            <form className="flex flex-col max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 text-base border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 text-base border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
              <label htmlFor="message" className="block text-slate-700 font-bold mb-2">
                Leave us a message:
              </label>
              <textarea
                id="message"
                className="w-full border rounded-lg p-3 resize-y focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Type your message here..."
                rows="5"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Social Media Section */}
      <footer className="flex items-center justify-center gap-4 py-4 bg-gray-100">
        <div className="text-base">Connect with us:</div>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 bg-cover rounded-full"
          style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png')" }}
        ></a>
        <a
          href="mailto:contact@gd-groups.com"
          className="w-8 h-8 bg-cover rounded-full"
          style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png')" }}
        ></a>
      </footer>
    </div>
  );
};

export default About;
