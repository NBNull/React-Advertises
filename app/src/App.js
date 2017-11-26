import React from 'react'
import { connect } from 'react-redux'
import {}

class App extends React.Component {
  render() {
    const store = this.props.store
    const num = store.getState()
    const addNUM = this.props.addNUM
    const removeNUM = this.props.removeNUM
    const addAsyncNUM = this.props.addAsyncNUM
    return (
    <div>
      <div>现有数字{num}</div>
      <button onClick={() => store.dispatch(addNUM())}>+1</button>
      <button onClick={() => store.dispatch(removeNUM())}>-1</button>
      <button onClick={() => store.dispatch(addAsyncNUM())}>2秒后+1</button>
    </div>)
  }
}

const mapStatetoProps(state){
  return {num:state}
}

const actionCreate

App = connect()(App)

export default App
