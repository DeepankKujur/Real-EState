import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-700 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-gray-300 shadow-xl p-8 rounded-lg border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Terms and Conditions
        </h1>

        <div className="text-lg text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to <span className="font-semibold text-blue-600">
                <Link to="/" className="hover:underline">[Gd-Groups]</Link>
              </span>! By accessing or using our website, you agree to comply with the terms and conditions outlined below. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of the Website</h2>
            <p className="mb-4">
              Our platform provides a marketplace for individuals to find rental houses and stays. You agree not to use this website for any unlawful or prohibited activities.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Do not post misleading or fraudulent property listings.</li>
              <li>Respect the privacy of other users and their properties.</li>
              <li>Do not engage in any illegal activities through the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
            <p className="mb-4">
              As a user of our platform, you are responsible for the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Providing accurate and up-to-date information for your listings.</li>
              <li>Respecting the rules and guidelines for renting or booking stays.</li>
              <li>Paying any applicable rental fees or deposits as required.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bookings and Payments</h2>
            <p className="mb-4">
              All bookings made through the website must comply with the terms set by property owners or managers. Payments for rental stays must be made securely through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Listings and Accuracy</h2>
            <p className="mb-4">
              We strive to ensure the accuracy of property listings, but we cannot guarantee that all information provided is correct or up-to-date. We recommend verifying all details before making a booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Liability</h2>
            <p className="mb-4">
              We are not liable for any damages or losses incurred during your use of the website or from booking rental properties. We recommend reading each property’s terms carefully before proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy and Data Collection</h2>
            <p className="mb-4">
              Your privacy is important to us. Please review our <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span> to understand how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to the Terms</h2>
            <p className="mb-4">
              We reserve the right to update these Terms and Conditions at any time. Any changes will be posted on this page, and we encourage you to review it regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions regarding these Terms and Conditions, feel free to contact us at:
              <a href="mailto:info@gdgroups.com" className="text-blue-600 hover:underline">info@gdgroups.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
