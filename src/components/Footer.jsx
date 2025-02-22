import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#a39866] to-[#72bc71] text-black text-center p-4">
      <div>
        <p>Project work made with React+Tailwind</p>
        <div className="flex flex-row justify-center items-center space-x-4 pt-2">
          <a
            href="https://github.com/Simone-Fratini"
            target="_blank"
            className="text-[#0860b7] hover:underline"
          >
            Simone Fratini
          </a>
          <a
            href="https://github.com/Aj-Herrera-99"
            target="_blank"
            className="text-[#0860b7] hover:underline"
          >
            Ajhay Herrera
          </a>
          <a
            href="https://github.com/AndySMT"
            target="_blank"
            className="text-[#0860b7] hover:underline"
          >
            Andy Simota
          </a>
          <a href="https://github.com/Orsouene" target="_blank" className="text-[#0860b7] hover:underline">
            Orsouene Elaouizeb
          </a>
          <a
            href="https://github.com/DoriaFabio"
            target="_blank"
            className="text-[#0860b7] hover:underline"
          >
            Fabio Doria
          </a>
          <p className="text-sm">
          &copy; 2025 Boolean BoolBnB. All rights reserved.
        </p>
        </div>
      </div>
      {/* <div className="container mx-auto pt-3">
        <p className="text-sm">
          &copy; 2025 Boolean BoolBnB. All rights reserved.
        </p>
      </div> */}
    </footer>
  );
};

export default Footer;
