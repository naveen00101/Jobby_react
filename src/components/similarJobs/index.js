import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
// import {FaLocationDot} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {jobItem} = props

  const {
    companyLogoUrl,
    id,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <div className="similar-job-item">
        <div className="top-sec">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="c-logo"
          />
          <div className="title-sec">
            <h1 className="heading-2">{title}</h1>
            <div className="rating-sec">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="description-similar">
          <h1 className="similar-heading">Description</h1>
          <p className="text-d">{jobDescription}</p>
        </div>

        <div className="loc-type-sec">
          <div>
            {/* <FaLocationDot className="icon" /> */}
            <p className="text-e">{location}</p>
          </div>

          <div className="type-sec">
            <BsBriefcaseFill className="icon" />
            <p className="text-e">{employmentType}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SimilarJob
