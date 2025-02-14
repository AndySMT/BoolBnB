import React from "react";

function PopUp({ isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-12345">
      <div className="bg-white p-6 rounded-lg shadow-xl">{children}</div>
    </div>
  );
}

export default PopUp;
