import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey("xxxxxx");
Geocode.enableDebug();

class SampleApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
  }
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
  componentDidMount() {
    Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);

        console.log('city', city, area, state);

        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
        })
      },
      error => {
        console.error(error);
      }
    );
  };
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false
    }
  }
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
	/**
	 * And function for city,state and address input
	 * @param event
	 */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
  onInfoWindowClose = (event) => {

  };

	
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        })
      },
      error => {
        console.error(error);
      }
    );
  };

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
  onPlaceSelected = (place) => {
    console.log('plc', place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: (address) ? address : '',
      area: (area) ? area : '',
      city: (city) ? city : '',
      state: (state) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };


  render() {
    
    
    const AsyncMap = withScriptjs(
      
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >

            <Marker google={this.props.google}
              name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <Marker />
            {/* For Auto complete Search Box */}
            <div className="form-group">
              
              {/* <input type="text" name="city"  onChange={this.onChange} readOnly="readOnly" value={this.state.city} /> */}
              <Autocomplete className="form-control"
                style={{
                  margin: "-200px 0px 0px 0px",
                  width: "305px",
                  height:"33px",
                  position: "absolute",
                  left: "-18.5rem",
                  top: "2.3rem",
                  paddingLeft: '16px',
                  marginTop: '2px',
                  marginBottom: '500px'
                }}
                onPlaceSelected={this.onPlaceSelected}
                types={['(regions)']}
              />
              </div>
              <div>
              <Autocomplete className="form-contro2"
                style={{
                  margin: "-200px 0px 0px 0px",
                  width: "305px",
                  height:"33px",
                  position: "relative",
                  left: "-19.5rem",
                  top: "-500px",
                  paddingLeft: '16px',
                  marginTop: '2px',
                  marginBottom: '500px'
                }}
                onPlaceSelected={this.onPlaceSelected}
                types={['(regions)']}
              />
            </div>

          </GoogleMap>
        )
      )
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = <div>
        <div className="row">
          <div className="col-md-0">  

          </div>
          <div className="col-md-12">
            <AsyncMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB04Iha4MnlTVAvjGXQ_9vlQoH-ZTijq4U&callback=initMap&libraries=places"
              loadingElement={
                <div style={{ height: "70%", width:"100%", border:"2px solid black" }} />
              }
              containerElement={
                <div style={{ height: this.props.height }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }
            />
          </div>
        </div>
      </div>
    } else {
      map = <div style={{ height: this.props.height, display: "flex" }} />
    }
    return (map)
  }
}
export default SampleApp
