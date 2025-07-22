import React, { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import GoalOverview from "./components/GoalOverview";

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals from db.json on first load
useEffect(() => {
  fetch("http://localhost:3000/goals")
    .then((res) => res.json())
    .then((data) => setGoals(data))
    .catch((err) => console.error("Error fetching goals:", err));
}, []);

  // Function to add a new goal
  function handleAddGoal(newGoal) {
    setGoals([...goals, newGoal]);
  }

  function handleUpdateGoal(updatedGoal) {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  }
  function handleDeleteGoal(goalId) {
    const remainingGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(remainingGoals);
  }

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <GoalOverview goals={goals} />

      <GoalForm onAddGoal={handleAddGoal} />

      <DepositForm goals={goals} onUpdateGoal={handleUpdateGoal} />

      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
}

export default App;
