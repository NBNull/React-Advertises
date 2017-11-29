import React from 'react'
import {Grid, List} from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elem: ''
    }
  }
  render() {
    const avatorList = 'man,woman,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v => ({
      icon: require(`../img/${v}.png`),
      text: v
    }))
    const gridHeader = this.state.text
      ? (<div>
        <span style={{fontSize:18}}>已选择头像: </span>
        <img style={{width:15}} src={this.state.icon} alt=""/>
        </div>)
      : <div style={{fontSize:18}}>请选择头像</div>
    return (<div>
      <List renderHeader={() => gridHeader}>
        <Grid data={avatorList} columnNum={5} onClick={elem => {
            this.setState(elem)
            this.props.selectAvatar(elem.text)
          }}/>
      </List>
    </div>)
  }
}

export default AvatarSelector
