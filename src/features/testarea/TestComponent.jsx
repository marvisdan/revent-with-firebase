import React, { Component } from 'react'
import { connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { openModal } from '../modals/modalActions'

import { incrementCounter, decrementCounter } from './testActions'

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false,
  }

  handlesScriptLoad = () => {
    this.setState({ scriptLoaded: true})
  }

  onChange  = address => this.setState({address})

  handleFormSubmit = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    console.log('props', this.props);
    const { inc, dec, openModal } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    return (
      <div>

        <h1>Test Area</h1>
        <h3> the anwser is : { this.props.data }</h3>
        <Button onClick={() => inc()} color="green"  content="Increment" />
        <Button onClick={() => dec()} color="red"  content="Decrement" />
        <Button onClick={(data) => openModal('TestModal', data)} color="teal"  content="Open Modal" />
        <form onSubmit={this.handleFormSubmit}>
         { this.state.scriptLoaded && 
            <PlacesAutocomplete inputProps={inputProps} />
          }
          <button type="submit">Submit</button>
        </form>
      </div>
    );
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
    openModal: (data) => dispatch(openModal(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

