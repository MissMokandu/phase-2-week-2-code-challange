import { useState, useEffect } from "react";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  return (
    <div>
      <h1>My Financial Goals</h1>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.name}</strong> – Saved: ${goal.savedAmount} / ${goal.targetAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

