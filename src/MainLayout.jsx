import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"

import "./MainLayout.css"

function MainLayout() {

  const location = useLocation()

  const [transactions, setTransactions] = useState(() => {

    const savedTransactions =
      localStorage.getItem("transactions")

    if (savedTransactions) {
      return JSON.parse(savedTransactions)
    }

    return [
      {
        id: 1,
        title: "Salary",
        amount: 60000,
        type: "income",
        category: "Salary",
        date: "01 Sep 2026",
      },
      {
        id: 2,
        title: "Food",
        amount: 500,
        type: "expense",
        category: "Food",
        date: "02 Sep 2026",
      },
      {
        id: 3,
        title: "Transport",
        amount: 300,
        type: "expense",
        category: "Transport",
        date: "03 Sep 2026",
      },
    ]
  })


  // Save transactions
  useEffect(() => {

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    )

  }, [transactions])


  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {

    return localStorage.getItem("darkMode") === "true"

  })


  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    )

    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }

  }, [darkMode])


  // Add Transaction Modal
  const [showTransactionForm, setShowTransactionForm] =
    useState(false)


  const pageTitles = {

    "/dashboard": "Dashboard",
    "/transactions": "Transactions",
    "/analytics": "Analytics",
    "/settings": "Settings",

  }


  const currentTitle =
    pageTitles[location.pathname] || "Dashboard"


  return (

    <div
      className={`app-layout ${
        darkMode ? "dark-mode" : ""
      }`}
    >


      {/* Sidebar */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          FinTrack
        </div>


        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Dashboard
          </NavLink>


          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Transactions
          </NavLink>


          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Analytics
          </NavLink>


          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Settings
          </NavLink>

        </nav>

      </aside>


      {/* Main Content */}

      <main className="main-content">


        {/* Header */}

        <header className="app-header">

          <div className="header-text">

            <h1>
              {currentTitle}
            </h1>

            <p>
              Welcome back! Manage your finances easily.
            </p>

          </div>


          {/* Top Right Add Button */}

          <button
            className="header-add-btn"
            onClick={() =>
              setShowTransactionForm(true)
            }
          >
            + Add Transaction
          </button>

        </header>


        {/* Pages */}

        <Outlet
          context={{
            transactions,
            setTransactions,
            darkMode,
            setDarkMode,
            showTransactionForm,
            setShowTransactionForm,
          }}
        />

      </main>

    </div>
  )
}

export default MainLayout