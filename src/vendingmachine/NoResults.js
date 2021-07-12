
import React from "react";

export default function NoResults(){
  return (
    <div className="products">
      <div className="no-results">
        <img
          src="https://www.uokpl.rs/fpng/f/410-4102973_no-results-found.png"
          alt="Empty Tree"
        />
        <h2>Sorry, no products matched your search!</h2>
        <p>Enter a different keyword and try.</p>
      </div>
    </div>
  );
};

