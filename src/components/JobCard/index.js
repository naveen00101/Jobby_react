import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
// import {FaLocationDot} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
    employmentType,
    id,
  } = job

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="card-item">
        <div className="top-sec">
          <img src={companyLogoUrl} className="c-logo" alt="company logo" />
          <div className="title-sec">
            <h1 className="job-title">{title}</h1>
            <div className="rating-sec">
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="info-line">
          <div className="left-info">
            <div className="loc-con">
              {/* <FaLocationDot className="icon" /> */}
              <p>{location}</p>
            </div>

            <div className="job-type-con">
              <BsBriefcaseFill className="info-icon" />
              <p>{employmentType}</p>
            </div>
          </div>

          <div className="pakage-con">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description-con">
          <h1 className="d-heading">Description</h1>
          <p className="d-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
