import React from "react";

export default function EmptyCart(){
  return (
    <div className="empty-cart">
      <img
        src="https://www.uokpl.rs/fpng/f/147-1473929_cart-empty-image.png"
        alt="empty-cart"
      />
      <h2>You cart is empty!</h2>
    </div>
  );
};

