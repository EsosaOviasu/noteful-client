import React from 'react'
import PropTypes from 'prop-types';
import './CircleButton.css'

export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}


NavCircleButton.proptype = {
  tag: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
