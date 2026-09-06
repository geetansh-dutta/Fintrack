import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import "./Transactions.css"

function Transactions() {

  const { transactions, setTransactions } = useOutletContext()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const [editingId, setEditingId] = useState(null)

  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")
  const [editType, setEditType] = useState("expense")
  const [editCategory, setEditCategory] = useState("Food")
  const [editDate, setEditDate] = useState("")


  // Delete Transaction
  const deleteTransaction = (id) => {

    setTransactions(
      transactions.filter(
        (transaction) => transaction.id !== id
      )
    )

  }


  // Start Editing
  const editTransaction = (transaction) => {

    setEditingId(transaction.id)

    setEditTitle(transaction.title)
    setEditAmount(transaction.amount)
    setEditType(transaction.type)
    setEditCategory(transaction.category)
    setEditDate(transaction.date)

  }


  // Update Transaction
  const updateTransaction = (e) => {

    e.preventDefault()

    if (!editTitle || !editAmount || !editDate) {
      alert("Please fill all fields")
      return
    }

    setTransactions(
      transactions.map((transaction) =>
        transaction.id === editingId
          ? {
              ...transaction,
              title: editTitle,
              amount: Number(editAmount),
              type: editType,
              category: editCategory,
              date: editDate,
            }
          : transaction
      )
    )

    cancelEdit()

  }


  // Cancel Editing
  const cancelEdit = () => {

    setEditingId(null)

    setEditTitle("")
    setEditAmount("")
    setEditType("expense")
    setEditCategory("Food")
    setEditDate("")

  }


  // Search + Filter
  const filteredTransactions = transactions.filter((transaction) => {

    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      transaction.type === filter

    return matchesSearch && matchesFilter

  })


  return (
    <div className="transactions-page">

      {/* Page Heading */}

      <div className="transactions-top">

        <h2>Transactions</h2>

        <p>
          Manage all your income and expenses.
        </p>

      </div>


      {/* Edit Form */}

      {editingId && (

        <div className="edit-form">

          <h2>Edit Transaction</h2>

          <form onSubmit={updateTransaction}>

            <input
              type="text"
              placeholder="Transaction title"
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Amount"
              value={editAmount}
              onChange={(e) =>
                setEditAmount(e.target.value)
              }
            />

            <select
              value={editType}
              onChange={(e) =>
                setEditType(e.target.value)
              }
            >
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
            </select>

            <select
              value={editCategory}
              onChange={(e) =>
                setEditCategory(e.target.value)
              }
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">
                Entertainment
              </option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              value={editDate}
              onChange={(e) =>
                setEditDate(e.target.value)
              }
            />

            <button type="submit">
              Update Transaction
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          </form>

        </div>

      )}


      {/* Search and Filter */}

      <div className="transaction-controls">

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>


      {/* Transactions */}

      <div className="all-transactions">

        {filteredTransactions.length === 0 ? (

          <p className="no-transactions">
            No transactions found.
          </p>

        ) : (

          filteredTransactions.map((transaction) => (

            <div
              className="transaction-row"
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


              <div className="transaction-right">

                <strong className={transaction.type}>

                  {transaction.type === "income"
                    ? "+"
                    : "-"}

                  ₹{transaction.amount}

                </strong>


                {/* Edit Button */}

                <button
                  className="edit-btn"
                  onClick={() =>
                    editTransaction(transaction)
                  }
                >
                  Edit
                </button>


                {/* Delete Button */}

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default Transactions