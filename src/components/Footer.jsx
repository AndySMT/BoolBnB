import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="hidden sm:block bg-linear-90/oklch from-15% from-[#d4c685] to-[#a7d3a6] text-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 pb-6 border-b border-gray-600 place-items-center">
          {/* Company Info */}
          <div className="text-sm flex flex-col gap-1
          ">
            <h3 className="font-semibold mb-3">Informazioni Legali</h3>
            <p>BoolB&B S.r.l.</p>
            <p>P. IVA: IT12345678901</p>
            <p>REA: MI-1234567</p>
            <p>Capitale sociale: € 3.000.000 i.v.</p>
            <p>Sede legale: Via Example 123, 20100 Milano</p>
          </div>

          {/* Team Members */}
          <div className="text-sm ">
            <h3 className="font-semibold mb-3">Il Nostro Team</h3>
            <div className="grid grid-cols-1 gap-1">
              <a href="https://github.com/Simone-Fratini" target="_blank" className="hover:underline">Simone Fratini</a>
              <a href="https://github.com/Aj-Herrera-99" target="_blank" className="hover:underline">Ajhay Harvey Herrera</a>
              <a href="https://github.com/AndySMT" target="_blank" className="hover:underline">Andy Simota</a>
              <a href="https://github.com/Orsouene" target="_blank" className="hover:underline">Orsouene Elaouizeb</a>
              <a href="https://github.com/DoriaFabio" target="_blank" className="hover:underline">Fabio Doria</a>
            </div>
          </div>

          {/* Links */}
          <div className="text-sm">
            <h3 className="font-semibold mb-3">Link Utili</h3>
            <div className="flex flex-col space-y-2">
              <Link to={"/terms"} className="hover:underline">Termini e condizioni</Link>
              <Link to={"/privacy"} className="hover:underline">Privacy Policy</Link>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-sm">
          <div className="flex flex-col md:flex-row justify-between items-baseline space-y-4  md:space-y-0">
            <p>Copyright © 2025 BoolB&B. Tutti i diritti riservati.</p>
            <p className="text-xs mt-4 text-center">
              BoolB&B non è responsabile per eventuali contenuti generati dagli utenti.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;