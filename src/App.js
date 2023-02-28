import React, { useState, useEffect } from 'react';
import CardShop from './components/cart';
import Footer from './components/footer';
import Header from './components/header';
import db from './db.js';
import './style.css';

export default function App() {

  const [basket, setBasket] = useState(db);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalAmount, setTotalAmount] = useState(basket.length);

  const removeClick = (id) => {
    const removeFind = basket.filter((item) => item.id !== id);
    setBasket(removeFind);
  };

  const clearAllBasket = () => {
    setBasket([]);
  };

  const updateAmountClick = (id, value) => {
    
    const amountCheck = basket.find((item) => item.id == id).amount;

    if (amountCheck == 1 && value == -1) {
      removeClick(id);
    } else {
      const update = basket.map((item) =>
        item.id === id ? { ...item, amount: amountCheck + value } : item
      );
      setBasket(update);
    }
  };

  const totalMoneyCalc = () => {
    let itemMoney = 0;
    basket.map((item) => {
      itemMoney += item.price * item.amount;
    });
    console.log(itemMoney);
    return itemMoney;
  };

  const setTotalAmountCalc = () => {
    let totalAmount = 0;
    basket.map((item) => {
      totalAmount += item.amount;
    });
    return totalAmount;
  };

  useEffect(() => {
    setTotalMoney(totalMoneyCalc());
    setTotalAmount(setTotalAmountCalc());
  }, [basket]);

  return (
    <div>
      <main>
        <Header totalAmount={totalAmount} />
        <section className="cart">
          <h1 style={{ textAlign: 'center' }}>YOUR BAG</h1>
          <div>
            {basket.map((item) => (
              <CardShop
                item={item}
                removeClick={removeClick}
                updateAmountClick={updateAmountClick}
              />
            ))}
          </div>
          <Footer clearAllBasket={clearAllBasket} totalMoney={totalMoney} />
        </section>
      </main>
    </div>
  );
}
