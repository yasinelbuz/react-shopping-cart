import React from 'react';
export default function Footer({ clearAllBasket, totalMoney }) {
  return (
    <footer>
      <hr />
      <div class="cart-total">
        <h4>
          total <span>${totalMoney}</span>
        </h4>
      </div>
      <button class="btn clear-btn" onClick={clearAllBasket}>
        clear cart
      </button>
    </footer>
  );
}
