import React from 'react';
import 'styles/Card.scss';

const Card = ({children, className}) => 
  <div className={`card ${className ? className: ''}`}>{children}</div>

export default Card;