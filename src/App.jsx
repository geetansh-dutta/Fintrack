import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import MainLayout from "./MainLayout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"

function App() {

  // Apply saved theme when app starts
  useEffect(() => {

    const savedTheme = localStorage.getItem("darkMode")

    if (savedTheme === "true") {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }

  }, [])


  return (

    <BrowserRouter>

      <Routes>

        {/* Landing Page */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* Main Application */}

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App