import "./Landing.css"
import { Link } from "react-router-dom"

function Landing() {
  return (
    <div className="landing">

      {/* Navbar */}

      <nav className="landing-nav">

        <div className="logo">
          FinTrack
        </div>

        <div className="nav-links">

          <a href="#features">Features</a>

          <a href="#about">About</a>

          <Link to="/dashboard" className="nav-get-started">
            Get Started
          </Link>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-text">
            SMARTER MONEY MANAGEMENT
          </p>

          <h1>
            Take Control of Your
            <span> Personal Finances</span>
          </h1>

          <p className="hero-description">
            Track your income, expenses and savings
            in one simple and organized place.
          </p>

          <Link to="/dashboard" className="primary-btn">
            Get Started
          </Link>

        </div>


        {/* Dashboard Preview */}

        <div className="dashboard-preview">

          <div className="preview-header">

            <p>Total Balance</p>

            <h2>₹45,200</h2>

          </div>


          <div className="preview-stats">

            <div>
              <p>Income</p>
              <strong>₹60,000</strong>
            </div>

            <div>
              <p>Expenses</p>
              <strong>₹14,800</strong>
            </div>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="features" id="features">

        <h2>
          Everything you need to manage your money
        </h2>

        <div className="feature-container">

          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>Track Money</h3>

            <p>
              Easily record your income and expenses.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>Understand Spending</h3>

            <p>
              See where your money goes with simple analytics.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>Reach Your Goals</h3>

            <p>
              Set savings goals and keep track of your progress.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}

      <footer className="landing-footer">

        <p>
          © 2026 FinTrack. Personal finance made simple.
        </p>

      </footer>

    </div>
  )
}

export default Landing