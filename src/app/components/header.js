import React from 'react'

import PropTypes from 'prop-types'

import { AppBar } from 'material-ui'

const Header = ({title, iconClassNameRight}) => {
  return(
    <AppBar
      title={title}
    />
  )
}

const { string } = PropTypes

Header.propTypes = {
  title: string.isRequired,
  iconClassNameRight: string.isRequired
}

export default Header
