import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="dummy">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="f-job-btn">
              Find Jobs
            </button>
          </Link>
        </div>
        {/* <img
          src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
          alt="find the job"
          className="home-desktop-img"
        /> */}
      </div>
    </div>
  )
}

export default Home
