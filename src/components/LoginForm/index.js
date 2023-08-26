import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: true,
    errorMsg: '',
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 2,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showError: true, errorMsg})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {userName, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />

          <form className="input-container" onSubmit={this.onSubmit}>
            <div className="input-field">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                value={userName}
                className="input-1 username"
                placeholder="Username"
                id="username"
                onChange={this.getUsername}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                value={password}
                className="input-1 pass"
                placeholder="Password"
                id="password"
                onChange={this.getPassword}
              />
            </div>
            <div className="btn-con">
              <button className="btn-login" type="submit">
                Login
              </button>
              {showError && <p className="e-msg">{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
