import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios

const IncomeForm = () => {
  const [incomeData, setIncomeData] = useState({
    date: '',
    category: '',
    amount: '',
    merchant: '',
    frequency: 'onetime', // Default frequency
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have an API endpoint for creating income records
      await axios.post('/api/incomes', incomeData);

      // Reset form after successful submission
      setIncomeData({
        date: '',
        category: '',
        amount: '',
        merchant: '',
        frequency: 'onetime',
      });

      // You can also add a success message or redirect the user
      console.log('Income created successfully!');
    } catch (error) {
      // Handle error - display an error message, log the error, etc.
      console.error('Error creating income:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={incomeData.date}
        onChange={handleInputChange}
        required
      />

      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={incomeData.category}
        onChange={handleInputChange}
        required
      />

      <label>Amount:</label>
      <input
        type="number"
        name="amount"
        value={incomeData.amount}
        onChange={handleInputChange}
        required
      />

      <label>Merchant:</label>
      <input
        type="text"
        name="merchant"
        value={incomeData.merchant}
        onChange={handleInputChange}
        required
      />

      <label>Frequency:</label>
      <select
        name="frequency"
        value={incomeData.frequency}
        onChange={handleInputChange}
      >
        <option value="onetime">One-time</option>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="biweekly">Bi-weekly</option>
        <option value="custom">Custom</option>
      </select>

      <button type="submit">Create Income</button>
    </form>
  );
};

export default IncomeForm;
