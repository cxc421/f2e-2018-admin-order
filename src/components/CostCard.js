import React from 'react';
import 'styles/CostCard.scss';

import Card from 'components/Card';
import { transValueToMoney } from 'util/transValueToMoney';

export default class CostCard extends React.PureComponent {

  render() {
    const { 
      title = "", 
      icon = "", 
      color = "", 
      value = 0 
    } = this.props;

    let iconsClassName = "";
    switch(icon) {
      case 'hand':
        iconsClassName = "fas fa-hand-holding-usd";
        break;
      case 'boxes':
        iconsClassName = "fas fa-boxes";
        break;
      case 'money':
        iconsClassName = "fas fa-money-bill";
        break;
    }


    return (
      <Card className="cost-card">
        <h2>
          <i className={iconsClassName}></i>
          {title}
        </h2>
        <p className={color}>{ transValueToMoney(value) }</p>
      </Card>
    );
  }

}