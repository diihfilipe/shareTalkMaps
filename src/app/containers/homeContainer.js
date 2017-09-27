import React, { Component } from 'react'

import Header from '../components/header'

//import SearchMap from '../components/maps/searchMap'
import LeafLet from '../components/maps/leaflet'

const styleMap = {
  height: '90vh',
  width: '100%',
}

const defaultCenter = {
  lat: -23.5489,
  lng: -46.6388
}

class Home extends Component {
  render(){
    return(
      <div>
        <Header
          title='Share( )'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
        />
        {/*
        <SearchMap
          id='googleMaps'
          style={styleMap}
          zoom={10}
          center={defaultCenter}
        />*/}
        <LeafLet
          id='leaflet'
          style={styleMap}
          zoom={10}
          center={defaultCenter}
        />
      </div>
    )
  }
}

export default Home