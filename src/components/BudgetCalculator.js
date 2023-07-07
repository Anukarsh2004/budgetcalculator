import React, { useState } from 'react';
import './BudgetCalculator.css';

const BudgetCalculator = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);

  const handleExpenseNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleExpensePriceChange = (event) => {
    setExpensePrice(parseFloat(event.target.value));
  };

  const handleAddExpense = () => {
    if (expenseName !== '' && expensePrice !== 0) {
      const newExpense = {
        name: expenseName,
        price: expensePrice,
        quantity: 1,
      };

      setExpenses([...expenses, newExpense]);
      setTotalExpenditure(totalExpenditure + expensePrice);

      // Reset input fields
      setExpenseName('');
      setExpensePrice(0);
    }
  };

  const handleQuantityChange = (index, event) => {
    const updatedExpenses = [...expenses];
    const oldQuantity = updatedExpenses[index].quantity;
    const newQuantity = parseInt(event.target.value);

    setTotalExpenditure(
      totalExpenditure - oldQuantity * updatedExpenses[index].price + newQuantity * updatedExpenses[index].price
    );
    updatedExpenses[index].quantity = newQuantity;

    setExpenses(updatedExpenses);
  };

  return (
    <div className="budget-calculator">
      <h1>Budget Calculator</h1>
      <div className="expense-inputs">
        <div>
          <label htmlFor="expense-name">Expense Name:</label>
          <input type="text" id="expense-name" value={expenseName} onChange={handleExpenseNameChange} />
        </div>
        <div>
          <label htmlFor="expense-price">Expense Price $:</label>
          <input type="number" id="expense-price" value={expensePrice} onChange={handleExpensePriceChange} />
        </div>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className="expense-list">
        <div className="labels">
          <span> Item</span>
          <span> Price</span>
          <span> Quantity</span>
          <span> Total Cost</span>
        </div>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <div className="expense-info">
                <span>{expense.name}</span>
              </div>
              <div className="expense-price">
                <span>${expense.price.toFixed(2)}</span>
              </div>
              <div className="expense-quantity">
                <input
                  type="number"
                  value={expense.quantity}
                  onChange={(event) => handleQuantityChange(index, event)}
                />
              </div>
              <div className="expense-total">
                <span>${(expense.price * expense.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="total-expenditure">Total Expenditure: ${totalExpenditure.toFixed(2)}</h2>
    </div>
  );
};

export default BudgetCalculator;
