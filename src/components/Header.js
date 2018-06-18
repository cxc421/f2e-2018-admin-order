import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styles/Header.scss';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <NavLink to="/" exact className="logo">Shoptime</NavLink>
        <NavLink to="/" exact className="nav-link">HOME</NavLink>
        <NavLink to="/orders" className="nav-link">ORDERS</NavLink>
        <NavLink to="/product" className="nav-link">PRODUCT</NavLink>
        <div className="user-name">ADMIN</div>
      </div>
    );
  }

}