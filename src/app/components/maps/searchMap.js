import React, { Component } from 'react'

import { connect } from 'react-redux'

import _ from 'underscore'

import moment from 'moment'

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SearchBox from 'react-google-maps/lib/places/SearchBox'

import { MAPS_KEY } from '../../config.js'

const googleMapURL=`https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=${MAPS_KEY}`

const GoogleMapHOC = withGoogleMap(( props ) => (
    <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={props.zoom}
    defaultCenter={props.center}
    // Pass the map reference here as props
    googleMapURL={props.googleMapURL}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        inputPlaceholder="Digite aqui o endereço"
        inputStyle={INPUT_STYLE}
        />
        {props.markers.map((marker, index) => (
        <Marker position={marker.position} key={index} onClick={props.markerClick} />
        ))}
  </GoogleMap>
))

const INPUT_STYLE = {
    boxSizing: `border-box`,
    MozBoxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `300px`,
    height: `40px`,
    marginTop: `10px`,
    padding: `0 12px`,
    borderRadius: `10px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
  }

class SearchMap extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      markers: [],
    }
    this.handleMapMounted = this.handleMapMounted.bind( this )
    this.handleBoundsChanged = this.handleBoundsChanged.bind( this )
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind( this )
    this.handlePlacesChanged = this.handlePlacesChanged.bind( this )
    this.handleMarkerClick = this.handleMarkerClick.bind( this )
  }

  handleMarkerClick( targetMarker ) {
      this.state.markers.map( marker => targetMarker.latLng.lat())
      //console.log(this.state.markers.filter( marker => targetMarker.latLng.lat() !== marker.position.lat && targetMarker.latLng.lng() !== marker.position.lng ))
  }

  handleMapMounted(map) {
    this._map = map
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces()

    const bounds = new google.maps.LatLngBounds()

    let { markers } = this.state

    places.map(place => {
      place.geometry.viewport ? bounds.union(place.geometry.viewport) : bounds.extend(place.geometry.location)
    })

    places.map(place => (
        markers.push({position: place.geometry.location})
    ))

    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center

    this.setState({
      center: mapCenter,
      markers,
    })

    this._map.fitBounds(bounds)
  }

    render() {
    const { id, style, zoom, center } = this.props

    return (
        <GoogleMapHOC
            containerElement={
                <div style={style} />
            }
            mapElement={
                <div style={style} />
            }
            zoom={zoom}
            center={center}
            googleMapURL={googleMapURL}
            onMapMounted={this.handleMapMounted}
            onBoundsChanged={this.handleBoundsChanged}
            onSearchBoxMounted={this.handleSearchBoxMounted}
            bounds={this.state.bounds}
            onPlacesChanged={this.handlePlacesChanged}
            markers={this.state.markers}
            markerClick={this.handleMarkerClick}
            />
    )
  }
}


export default SearchMap
