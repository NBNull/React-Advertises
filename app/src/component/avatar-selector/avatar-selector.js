import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propType = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      elem: ''
    }
  }
  render() {
    setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
    const avatorList = 'man,woman,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map((val)=> ({
      icon: require(`../img/${val}.png`),
      text: val
    }))
    const gridHeader = this.state.text
      ? (<div>
        <span style={{fontSize:18}}>已选择头像: </span>
        <img style={{width:15}} src={this.state.icon} alt=""/>
        </div>)
      : <div style={{fontSize:18}}>请选择头像</div>
    return (<div>
      <List renderHeader={() => gridHeader}>
        <Grid data={avatorList} isCarousel={true} itemStyle={{verticalAlign: 'top' }} columnNum={4} onClick={elem => {
            this.setState(elem)
            this.props.selectAvatar(elem.text)
          }}/>
      </List>
    </div>)
  }
}

export default AvatarSelector
