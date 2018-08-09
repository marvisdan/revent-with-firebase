import React, { Component } from 'react'
import { connect} from 'react-redux';
import { Button } from 'semantic-ui-react'

import { incrementCounter, decrementCounter } from './testActions'

class TestComponent extends Component {
  render() {
    console.log('props', this.props);
    const { inc, dec } = this.props;

    
    return (
      <div>
        <h1>Test Area</h1>
        <h3> the anwser is : { this.props.data }</h3>
        <Button onClick={() => inc()} color="green"  content="Increment" />
        <Button onClick={() => dec()} color="red"  content="Decrement" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.test.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    inc: () => dispatch(incrementCounter()),
    dec: () => dispatch(decrementCounter()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

