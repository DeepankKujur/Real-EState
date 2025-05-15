import React, { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setFeedbackError(true);
        return;
      }

      setFeedback(true);
      setFormData({ name: "", email: "", message: "" }); // Reset the form
    } catch (error) {
      setFeedbackError(true);
    }
  };


  return (
    <div className="font-serif leading-relaxed bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* Main Content */}
      <main className="px-8 py-16">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* About Us Section */}
          <section className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 p-10 shadow-xl rounded-lg border-t-4 border-blue-900">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">
              About Us
            </h2>
            <div className="text-lg text-gray-700 space-y-6">
              <p>
                At <span className="font-bold text-blue-600">GD-Groups</span>,
                we are dedicated to helping you find the ideal rental property
                that complements your lifestyle. Whether you're looking for a
                spacious house, a cozy apartment, or a short-term stay, we
                simplify your search with our seamless and efficient platform.
              </p>
              <p>
                Our diverse collection of rental properties is designed to suit
                various preferences and budgets. From{" "}
                <span className="font-medium text-blue-600">
                  single-bedroom apartments
                </span>{" "}
                to{" "}
                <span className="font-medium text-blue-600">
                  luxurious family homes
                </span>
                , we ensure that you’ll find a place that feels like home.
              </p>
              <div className="bg-teal-50 border-l-4 border-blue-600 p-4 italic text-black rounded-md">
                <p>
                  "At GD-Groups, your dream home is just a click away. Our
                  mission is to make renting effortless and enjoyable."
                </p>
              </div>
              <p>
                Thank you for choosing GD-Groups as your trusted partner in
                finding your next home. Let us help you turn your housing
                aspirations into reality.
              </p>
            </div>
          </section>

          {/* Query Section */}
          <section className="flex-1 bg-gray-50 p-10 shadow-xl rounded-lg border-t-4 border-gray-400">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">
              Have a Question or Query?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                onChange={handleChange}
                value={formData.name}
                type="text"
                id="name"
                placeholder="Your Name"
                className="p-4 text-base border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                onChange={handleChange}
                value={formData.email}
                type="email"
                id="email"
                placeholder="Your Email"
                className="p-4 text-base border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <textarea
                onChange={handleChange}
                value={formData.message}
                id="message"
                className="w-full border border-gray-300 rounded-lg p-4 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Type your message here..."
                rows="6"
              ></textarea>
              <button
                
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-gold-700 transition-all font-medium"
              >
                Submit
              </button>
            </form>
            {feedback && (
              <p className="text-green-600 mt-4">Message sent successfully!</p>
            )}
            {feedbackError && (
              <p className="text-red-600 mt-4">Something went wrong!</p>
            )}
          </section>
        </div>
      </main>

    </div>
  );
};

export default About;
