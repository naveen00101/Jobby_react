import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'
import Filter from '../Filter'
import Profile from '../Profile'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    typeOfEmployment: [],
    salaryRange: '',
    search: '',
    apiState: apiStatusConstants.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  typeFilter = id => {
    this.setState(prevState => {
      const {typeOfEmployment} = prevState
      console.log(typeOfEmployment)
      if (typeOfEmployment.includes(id)) {
        const updatedList = typeOfEmployment.filter(each => each !== id)
        return {typeOfEmployment: updatedList}
      }
      return {typeOfEmployment: [...typeOfEmployment, id]}
    }, this.getJobs)
  }

  salaryFilter = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  getJobs = async () => {
    this.setState({apiState: apiStatusConstants.inProgress})
    const {typeOfEmployment, salaryRange, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const typeForUrl = typeOfEmployment.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeForUrl}&minimum_package=${salaryRange}&search=${search}`
    // let url = 'https://apis.ccbp.in/jobs?'
    // if (typeOfEmployment.length !== 0) {
    //   const typeForUrl = typeOfEmployment.join(',')
    //   url = `${url}employment_type=${typeForUrl}&`
    // }

    // if (salaryRange !== '') {
    //   url = `${url}minimum_package=${salaryRange}&`
    // }

    // if (search !== '') {
    //   url = `${url}search=${search}`
    // }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const formattedData = {
        jobs: jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        })),

        total: data.total,
      }
      console.log(formattedData)
      this.setState({
        jobsList: formattedData,
        apiState: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsList: [], apiState: apiStatusConstants.failure})
    }
  }

  getSearchText = event => {
    this.setState({search: event.target.value})
  }

  renderJobCards = () => {
    const {jobsList} = this.state
    // console.log(jobsList)
    if (jobsList.jobs.length !== 0) {
      return (
        <ul className="job-list-container">
          {jobsList.jobs.map(each => (
            <JobCard job={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-job"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderViaAPIState = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderJobCards()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <div className="job-route-container">
        <Header />
        <div className="all-sec">
          <div className="left-sec">
            <Profile />
            <Filter f1={this.typeFilter} salaryFilter={this.salaryFilter} />
          </div>

          <div className="main-sec">
            <div className="search-con">
              <input
                type="search"
                onChange={this.getSearchText}
                className="search-box"
                placeholder="Search"
                value={search}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderViaAPIState()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
