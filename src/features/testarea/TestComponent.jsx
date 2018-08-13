import React, { Component } from 'react'
import { connect} from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
// import Script from 'react-load-script';
import GoogleMapReact from 'google-map-react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


import { incrementCounter, decrementCounter } from './testActions'

const Marker = () => <Icon name='marker' size='big' color='red' />
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
    const { inc, dec } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    const API_KEY = 'AIzaSyDDzC59PqRc3-y3fN7MM5NMg10Q7Q9nkao';
    return (
      <div>
      {/* <Script 
        url={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
        onLoad={this.handlesScriptLoad}
      /> */}
        <h1>Test Area</h1>
        <h3> the anwser is : { this.props.data }</h3>
        <Button onClick={() => inc()} color="green"  content="Increment" />
        <Button onClick={() => dec()} color="red"  content="Decrement" />
        <form onSubmit={this.handleFormSubmit}>
         { this.state.scriptLoaded && 
            <PlacesAutocomplete inputProps={inputProps} />
          }
          <button type="submit">Submit</button>
        </form>

        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

