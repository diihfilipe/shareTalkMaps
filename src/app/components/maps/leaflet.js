import React, { Component } from 'react'

import L from 'leaflet'

class LeafletMap extends Component {
  constructor( props ){
    super( props )
    this.handleMapLoad = this.handleMapLoad.bind( this )
  }

  componentDidMount(){
    this.handleMapLoad()
  }

  handleMapLoad( ) {
    const self = this
    const { center, id } = this.props
    const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    self.map = L.map(id).setView(center, 10)

    if ( self.map ) {
      L.tileLayer(osmUrl, {
        maxZoom: 19,
        id,
      }).addTo( self.map )
      L.control.scale().addTo(self.map)
      
    }
  }
  render( ){
    const { id, style } = this.props
    return(
      <div id={ id } style={style}></div>
    )
  }
}

export default LeafletMap