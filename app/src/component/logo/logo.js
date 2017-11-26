import React from 'react'
import logoImg from './zhaopin.png'
import './logo.css'
class Logo extends React.Component {
  render(){
    return(
      <div className="logo-container">
        <img className="logo-main" src={logoImg} alt="logo"/>
      </div>
    )
  }
}
export default Logo
