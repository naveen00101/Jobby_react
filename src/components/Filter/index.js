import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Filter extends Component {
  state = {}

  renderTypeOfEmployment = () =>
    employmentTypesList.map(each => {
      const {f1} = this.props
      const onCheck = event => {
        f1(event.target.value)
      }
      return (
        <li className="type-item" key={each.employmentTypeId}>
          <input
            type="checkbox"
            className="type-check"
            id={each.employmentTypeId}
            onChange={onCheck}
            value={each.employmentTypeId}
          />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
        </li>
      )
    })

  renderSalaryRange = () =>
    salaryRangesList.map(each => (
      <div className="salary-item" key={each.salaryRangeId}>
        <input
          type="radio"
          name="salary"
          className="input-salary"
          id={each.salaryRangeId}
          value={each.salaryRangeId}
        />
        <label htmlFor={each.salaryRangeId}>{each.label}</label>
      </div>
    ))

  onSelect = event => {
    const {salaryFilter} = this.props
    salaryFilter(event.target.value)
  }

  render() {
    return (
      <div className="filter-container">
        <hr className="filter-line" />
        <div className="type-of-emp">
          <h1 className="filter-heading">Type of Employment</h1>
          <ul className="type-container">{this.renderTypeOfEmployment()}</ul>
        </div>
        <hr className="filter-line" />
        <div className="salary-range">
          <h1 className="filter-heading">Salary Range</h1>
          <div onChange={this.onSelect}>{this.renderSalaryRange()}</div>
        </div>
      </div>
    )
  }
}

export default Filter
