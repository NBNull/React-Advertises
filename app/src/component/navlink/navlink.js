import React from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component {
  static propType = {
    data: PropTypes.array.isRequired
  }
  render(){
    console.log(this.props.data);
    const navList = this.props.data.filter(v=>!v.hide)
    console.log(navList);
    const {pathname} = this.props.location
    return(
      <TabBar>
        {navList.map(v=>(
          <TabBar.Item key={v.path} title={v.text}
          icon={
            <div
            className={`anticon icon-${v.icon}`}
            style={{fontSize:'16px'}}>
            </div>
          }
          selectedIcon={
            <div
            className={`anticon icon-${v.icon}`}
            style={{color:'#108ee9',fontSize:'16px'}}>
            </div>
          }
          selected={pathname===v.path}
          onPress={()=>{
            this.props.history.push(v.path)
          }}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar
