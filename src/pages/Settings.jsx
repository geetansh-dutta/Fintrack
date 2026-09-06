import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import "./Settings.css"

function Settings() {

  const {
    transactions,
    setTransactions,
    darkMode,
    setDarkMode,
  } = useOutletContext()


  // Savings Goal

  const [goal, setGoal] = useState(() => {

    const savedGoal =
      localStorage.getItem("savingsGoal")

    return savedGoal
      ? Number(savedGoal)
      : 50000

  })


  // Save goal

  useEffect(() => {

    localStorage.setItem(
      "savingsGoal",
      goal
    )

  }, [goal])


  // Calculate income

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )


  // Calculate expenses

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )


  // Calculate savings

  const savings = income - expenses


  // Calculate progress

  const progress =
    goal > 0
      ? Math.min((savings / goal) * 100, 100)
      : 0


  // Clear transactions

  const clearTransactions = () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all transactions?"
    )

    if (confirmDelete) {
      setTransactions([])
    }

  }


  return (

    <div className="settings-page">

      {/* Heading */}

      <div className="settings-heading">

        <h2>Settings</h2>

        <p>
          Manage your FinTrack preferences.
        </p>

      </div>


      {/* Appearance */}

      <div className="settings-card">

        <h3>Appearance</h3>

        <p>
          Choose how FinTrack looks.
        </p>


        <div className="theme-setting">

          <div>

            <strong>
              {darkMode
                ? "Dark Mode"
                : "Light Mode"}
            </strong>

            <span>
              {darkMode
                ? "Dark theme is enabled"
                : "Light theme is enabled"}
            </span>

          </div>


          <button
            className={`theme-toggle ${
              darkMode ? "active" : ""
            }`}
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >

            <span className="toggle-circle">
              {darkMode ? "🌙" : "☀️"}
            </span>

          </button>

        </div>

      </div>


      {/* Savings Goal */}

      <div className="settings-card">

        <h3>Savings Goal</h3>

        <p>
          Set a target amount that you want to save.
        </p>


        <div className="goal-input">

          <label>
            Savings Goal
          </label>

          <input
            type="number"
            value={goal}
            onChange={(e) =>
              setGoal(Number(e.target.value))
            }
          />

        </div>


        <div className="goal-info">

          <div>

            <span>
              Current Savings
            </span>

            <strong>
              ₹{savings.toLocaleString()}
            </strong>

          </div>


          <div>

            <span>
              Goal
            </span>

            <strong>
              ₹{goal.toLocaleString()}
            </strong>

          </div>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>


        <p className="progress-text">

          {progress.toFixed(0)}%
          {" "}of your goal completed

        </p>

      </div>


      {/* Danger Zone */}

      <div className="settings-card danger-zone">

        <h3>
          Danger Zone
        </h3>

        <p>
          Permanently remove all your
          transaction data.
        </p>

        <button
          className="clear-btn"
          onClick={clearTransactions}
        >
          Clear All Transactions
        </button>

      </div>

    </div>

  )
}

export default Settings