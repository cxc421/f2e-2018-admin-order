import React from 'react';
import 'styles/OrderItem.scss';

import { transValueToMoney } from 'util/transValueToMoney';

export default class OrderItem extends React.PureComponent {

  render() {

    const {
      imgUrl, 
      title,
      date,
      client,
      total
    } = this.props;

    const imgStyle = {
      backgroundImage: `url(${imgUrl})`
    };    

    return (
      <li className="order-item">
        <div className="img-area" style={imgStyle}></div>
        <div className="content-area">
          <h3>{title}</h3>
          <div className="row">
            <div className="icon-and-text">
              <i className="fas fa-clock"></i>
              <span>{date}</span>              
            </div>
            <div className="total-text">Total</div>
          </div>
          <div className="row">
            <div className="icon-and-text">
              <i className="fas fa-male"></i>
              <span>{client}</span>
            </div> 
            <div className="total-value">{transValueToMoney(total)}</div>         
          </div>
        </div>
      </li>
    );
  }

}