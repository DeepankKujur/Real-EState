import React from 'react'

export default function Footer() {
  return (
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
  )
}
