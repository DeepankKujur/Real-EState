import React ,{useEffect} from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const users = [
    {
      name: "Gaurav Singh",
      role: "full stack developer",
      description:
        " built RESTful APIs with Node.js, managed MongoDB, and developed responsive UIs using React. implemented JWT authentication, ensured smooth frontend-backend integration, and deployed the app using Render.followed best practices for security, version control, and performance while maintaining clean, modular, and scalable code.",
      image: "https://lh3.googleusercontent.com/ogw/AF2bZyjcZCE0zxJXE0T69YE4SvAjNPN6sFpawofedr8biew6ySc=s64-c-mo",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Deepank kujur",
      role: "Full Stack Developer",
      description:
        " built RESTful APIs with Node.js, managed MongoDB, and developed responsive UIs using React. followed best practices for version control, and performance while maintaining clean, modular, and scalable code.",
      image: "https://media-del2-2.cdn.whatsapp.net/v/t61.24694-24/427980359_3795211080799759_997187017390890733_n.jpg?ccb=11-4&oh=01_Q5Aa1gFTvkXYWjzi_TOOTbVnAj7lKDHm19jW0nsdhWytK7cEeQ&oe=68327D7F&_nc_sid=5e03e0&_nc_cat=103",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center px-6 py-12">
      <div className="flex flex-wrap justify-center gap-12">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-2xl shadow-2xl p-10 w-[400px] h-[550px] text-center relative transform hover:scale-105 hover:shadow-2xl transition duration-500 ease-in-out"
          >
            {/* Profile Image */}
            <div className="flex justify-center -mt-24">
              <img
                src={user.image}
                alt={user.name}
                className="w-48 h-48 rounded-full object-cover border-8 border-gray-700 shadow-lg scale-120"
              />
            </div>

            {/* User Info */}
            <h2 className="text-4xl font-bold mt-8">{user.name}</h2>
            <p className="text-lg font-bold text-yellow-400 mb-4">{user.role}</p>

            {/* Divider */}
            <div className="w-30 h-1 bg-gradient-to-r from-yellow-500 to-yellow-200 mx-auto rounded-full mb-4"></div>

            {/* Description Section */}
            <p className="text-gray-300 text-sm px-4 mb-6">{user.description}</p>

            {/* Social Media Links at Bottom */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              <a
                href={user.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition transform hover:scale-125"
              >
                <FaTwitter size={40} />
              </a>
              <a
                href={user.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition transform hover:scale-125"
              >
                <FaLinkedin size={40} />
              </a>
              <a
                href={user.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition transform hover:scale-125"
              >
                <FaGithub size={40} />
              </a>
              <a
                href={user.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition transform hover:scale-125"
              >
                <FaInstagram size={40} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
