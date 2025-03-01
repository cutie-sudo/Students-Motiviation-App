// src/components/ui/button.jsx
import React from "react";

// Correctly exported as a named export
export const Button = ({ children, className, ...props }) => (
  <button {...props} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
    {children}
  </button>
);
