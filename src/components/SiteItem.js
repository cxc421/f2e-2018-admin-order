import React from 'react';
import ReactTooltip from 'react-tooltip';
import 'styles/SiteItem.scss';

import { transValueToMoney } from 'util/transValueToMoney';

export default class SiteItem extends React.PureComponent {

  render() {
    // console.log(this.props);

    const { name, views, previous } = this.props;
    const direction = views >= previous ? "up" : "down";
    const diff = Math.abs(views - previous);
    const percent = Math.round( diff * 100 / previous ) + "%";

    return (
      <li className="site-item">
        <i className={`fab fa-${ name }`}></i>
        <span className="title">{ `${name}.com`  }</span>
        <span className="value">{transValueToMoney(views)}</span>
        <span className={`percent ${direction}`} data-tip data-for={name} >
          <i className={`fas fa-arrow-${ direction }`}></i>
          { percent }
        </span>
        <ReactTooltip effect="solid" id={name} className="tool-tip">
          {
            views >= previous
              ? <p>INCREASE<em className="up">{diff}</em>VIEWS</p>
              : <p>DECREASE<em className="down">{diff}</em>VIEWS</p>
          }
          <span>last week: {transValueToMoney(previous)}</span>
        </ReactTooltip>
      </li>
    );
  }

}