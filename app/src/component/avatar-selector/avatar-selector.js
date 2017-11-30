import React from 'react'
import {Grid, List} from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elem: ''
    }
  }
  componentWillMount(){
    console.log("渲染开始");
  }
  componentDidMount(){
    console.log("渲染完毕");
  }
  render() {
    setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
    const avatorList = 'man,woman,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map((val)=> ({
      icon: require(`../img/${val}.png`),
      text: val
    }))
    console.log(avatorList);
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
