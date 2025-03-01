// src/components/ui/card.jsx
import React from "react";

// Card Component
export const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardContent Component
export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
