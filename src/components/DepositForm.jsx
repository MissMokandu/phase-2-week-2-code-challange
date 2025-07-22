import React, { useState } from "react";

function DepositForm({ goals, onUpdateGoal }) {
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const goal = goals.find((g) => g.id === selectedId);
    if (!goal) return;

    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + parseFloat(amount),
    };

    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        onUpdateGoal(data);
        setAmount("");
        setSelectedId("");
      });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Make a Deposit</h2>
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
        <option value="">-- Select Goal --</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
