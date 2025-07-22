import React from "react";

function GoalList({ goals, onDeleteGoal }) {
  return (
    <div>
      <h2 className="goals-heading">Your Goals</h2>
      <hr className="goals-divider" />
      {goals.length === 0 ? (
        <p>No goals yet</p>
      ) : (
        goals.map((goal) => {
          const progress = Math.min(
            (goal.savedAmount / goal.targetAmount) * 100,
            100
          );

          return (
            <div
              key={goal.id}
              
            >
              <h3>{goal.name}</h3>
              <p>Category: {goal.category}</p>
              <p>
                Saved: ${goal.savedAmount} / ${goal.targetAmount}
              </p>
              <p>Deadline: {goal.deadline}</p>
              <button
                onClick={() => onDeleteGoal(goal.id)}
                
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default GoalList;
