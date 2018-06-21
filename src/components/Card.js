import React from 'react';
import 'styles/Card.scss';

const Card = ({children, className}) => 
  <div className={`app-card ${className ? className: ''}`}>{children}</div>

export default Card;