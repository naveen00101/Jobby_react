import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
// import {FaLocationDot} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Component} from 'react'
import Header from '../Header'
import SimilarJob from '../similarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: '',
    similarJobsData: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: `GET`,
    }
    console.log(this.props)

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const similarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(data.job_details.skills)
      const skills = data.job_details.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))

      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebSiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills,
        lifeAtCompany,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      this.setState({
        jobData: jobDetails,
        similarJobsData: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getJobDetails()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-con">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="image-failure"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        we cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderJobItem = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebSiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData

    return (
      <div className="bga-container">
        <div className="job-item-container">
          <div className="logo-name-sec">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="role-sec">
              <h1 className="role-heading">{title}</h1>
              <div className="rating-sec">
                <AiFillStar className="star-icon" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>

          <div className="loc-type-salary-sec">
            <div className="front-sec">
              <div className="loc-sec">
                {/* <FaLocationDot className="icon-2" /> */}
                <p className="text-2">{location}</p>
              </div>
              <div className="type-sec">
                <BsBriefcaseFill className="icon-2" />
                <p className="text-2">{employmentType}</p>
              </div>
            </div>

            <div className="end-sec">
              <p className="text-3">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line-1" />

          <div className="body-sec">
            <div className="description-sec">
              <div className="heading-sec">
                <h1 className="heading-2">Description</h1>
                <a className="visit" href={companyWebSiteUrl}>
                  Visit <FiExternalLink className="icon" />
                </a>
              </div>
              <p className="text-4">{jobDescription}</p>
            </div>

            <div className="skills-sec">
              <div className="heading-sec">
                <h1 className="heading-3">Skills</h1>
              </div>
              <div>
                <ul className="skills-list">
                  {skills.map(eachItem => (
                    <li className="skill-item" key={eachItem.name}>
                      <img
                        src={eachItem.imageUrl}
                        alt={eachItem.name}
                        className="skill-img"
                      />
                      <p className="text-4">{eachItem.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="life-at-company-sec">
              <div className="heading-sec">
                <h1 className="heading-3">Life at Company</h1>
              </div>
              <div className="description-con-2">
                <p className="text-4">{lifeAtCompany.description}</p>
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="life-at"
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="heading-2 similar-jobs-heading">Similar Jobs</h1>
        <div className="similar-job-sec">
          <ul className="similar-list">
            {similarJobsData.map(eachItem => (
              <SimilarJob jobItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getRenderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItem()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-con">
        <Header />
        <div>{this.getRenderView()}</div>
      </div>
    )
  }
}

export default JobItemDetails
