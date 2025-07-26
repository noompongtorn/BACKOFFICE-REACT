import React from "react";

// image
import Basketball from "../assets/images/basketball.svg";

const Header = () => {
  return (
    <header>
      <nav className="border-gray-200 px-4 py-2 border-b-2 bg-gray-800">
        <div className="flex flex-wrap justify-between  items-center">
          <a href="/" className="flex items-center">
            <img
              src={Basketball}
              className="mr-3 h-6 sm:h-9"
              alt="Basketball Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              NBA
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
