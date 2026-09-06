import { useOutletContext } from "react-router-dom"
import "./Analytics.css"

function Analytics() {

  const { transactions } = useOutletContext()

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = totalIncome - totalExpenses


  // Calculate spending by category
  const categoryTotals = {}

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {

      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount
      } else {
        categoryTotals[transaction.category] = transaction.amount
      }

    })


  return (
    <div className="analytics-page">

      <div className="analytics-heading">
        <h2>Analytics</h2>
        <p>Understand your financial activity.</p>
      </div>


      {/* Summary */}

      <div className="analytics-cards">

        <div className="analytics-card">
          <p>Total Income</p>
          <h2>₹{totalIncome.toLocaleString()}</h2>
        </div>

        <div className="analytics-card">
          <p>Total Expenses</p>
          <h2>₹{totalExpenses.toLocaleString()}</h2>
        </div>

        <div className="analytics-card">
          <p>Balance</p>
          <h2>₹{balance.toLocaleString()}</h2>
        </div>

      </div>


      {/* Spending by Category */}

      <div className="analytics-section">

        <h2>Spending by Category</h2>

        {Object.keys(categoryTotals).length === 0 ? (

          <p>No expense data available.</p>

        ) : (

          Object.entries(categoryTotals).map(
            ([category, amount]) => (

              <div
                className="category-item"
                key={category}
              >

                <div className="category-info">
                  <span>{category}</span>
                  <strong>
                    ₹{amount.toLocaleString()}
                  </strong>
                </div>

                <div className="category-bar">

                  <div
                    className="category-fill"
                    style={{
                      width: `${
                        (amount / totalExpenses) * 100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>

            )
          )

        )}

      </div>


      {/* Income vs Expense */}

      <div className="analytics-section">

        <h2>Income vs Expenses</h2>

        <div className="comparison">

          <div className="comparison-item">

            <p>Income</p>

            <div className="comparison-bar">

              <div
                className="income-bar"
                style={{
                  width: "100%",
                }}
              ></div>

            </div>

            <strong>
              ₹{totalIncome.toLocaleString()}
            </strong>

          </div>


          <div className="comparison-item">

            <p>Expenses</p>

            <div className="comparison-bar">

              <div
                className="expense-bar"
                style={{
                  width:
                    totalIncome > 0
                      ? `${(totalExpenses / totalIncome) * 100}%`
                      : "0%",
                }}
              ></div>

            </div>

            <strong>
              ₹{totalExpenses.toLocaleString()}
            </strong>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Analytics