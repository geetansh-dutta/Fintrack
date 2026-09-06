import React from "react"
import { useOutletContext } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  const {
    transactions,
    setTransactions,
    showTransactionForm,
    setShowTransactionForm,
  } = useOutletContext()

  // Get current month and current year
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Show only current month's transactions
  const currentMonthTransactions = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date)

      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      )
    }
  )

  // Calculate current month's income
  const totalIncome = currentMonthTransactions
    .filter(
      (transaction) => transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  // Calculate current month's expenses
  const totalExpenses = currentMonthTransactions
    .filter(
      (transaction) => transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  // Calculate balance
  const totalBalance = totalIncome - totalExpenses

  // Calculate savings
  const totalSavings = totalIncome - totalExpenses

  // Display current month name
  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  )

  return (
    <div className="dashboard">

      {/* Current Month */}
      <div className="current-month">
        <h2>{monthName}</h2>
        <p>Your financial activity for this month</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-cards">

        <div className="summary-card">
          <p>Total Balance</p>
          <h2>
            ₹{totalBalance.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card">
          <p>Total Income</p>
          <h2>
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card">
          <p>Total Expenses</p>
          <h2>
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card">
          <p>Total Savings</p>
          <h2>
            ₹{totalSavings.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="recent-transactions">

        <div className="section-header">
          <div>
            <h2>Recent Transactions</h2>
            <p className="section-subtitle">
              Your latest activity this month
            </p>
          </div>
        </div>

        <div className="transaction-list">

          {currentMonthTransactions.length === 0 ? (

            <div className="empty-transactions">

              <div className="empty-icon">
                💰
              </div>

              <h3>
                No transactions this month
              </h3>

              <p>
                Add a transaction to start
                tracking your spending.
              </p>

            </div>

          ) : (

            currentMonthTransactions
              .slice(0, 5)
              .map((transaction) => (

                <div
                  className="transaction"
                  key={transaction.id}
                >

                  <div>
                    <h3>
                      {transaction.title}
                    </h3>

                    <p>
                      {transaction.category} •{" "}
                      {transaction.date}
                    </p>
                  </div>

                  <strong
                    className={transaction.type}
                  >
                    {transaction.type === "income"
                      ? "+"
                      : "-"}
                    ₹
                    {transaction.amount.toLocaleString()}
                  </strong>

                </div>

              ))
          )}

        </div>
      </div>

      {/* ADD TRANSACTION MODAL */}

      {showTransactionForm && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowTransactionForm(false)
          }
        >

          <div
            className="transaction-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>Add Transaction</h2>

                <p>
                  Record your income or expense
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowTransactionForm(false)
                }
              >
                ×
              </button>

            </div>

            <TransactionForm
              transactions={transactions}
              setTransactions={setTransactions}
              closeModal={() =>
                setShowTransactionForm(false)
              }
            />

          </div>

        </div>

      )}

    </div>
  )
}


/* =========================
   TRANSACTION FORM
========================= */

function TransactionForm({
  transactions,
  setTransactions,
  closeModal,
}) {

  const [title, setTitle] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [type, setType] = React.useState("expense")
  const [category, setCategory] =
    React.useState("Food")
  const [date, setDate] = React.useState("")

  const addTransaction = (e) => {
    e.preventDefault()

    if (!title || !amount || !date) {
      alert("Please fill all fields")
      return
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,

      // Store date as YYYY-MM-DD
      date,
    }

    setTransactions([
      newTransaction,
      ...transactions,
    ])

    closeModal()
  }

  return (
    <form
      className="modal-form"
      onSubmit={addTransaction}
    >

      <div className="form-group">

        <label>
          Transaction Title
        </label>

        <input
          type="text"
          placeholder="e.g. Grocery shopping"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

      </div>


      <div className="form-group">

        <label>
          Amount
        </label>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

      </div>


      <div className="form-row">

        <div className="form-group">

          <label>
            Type
          </label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >

            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>

          </select>

        </div>


        <div className="form-group">

          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="Food">
              Food
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Salary">
              Salary
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

      </div>


      <div className="form-group">

        <label>
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

      </div>


      <div className="modal-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-transaction-btn"
        >
          Add Transaction
        </button>

      </div>

    </form>
  )
}

export default Dashboard