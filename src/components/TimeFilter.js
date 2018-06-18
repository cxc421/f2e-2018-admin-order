import React from 'react';
import 'styles/TimeFilter.scss';

export default class TimeFilter extends React.PureComponent {
  render() {
    return (
      <div className="time-filter">
        <span className="date">2018/6/6</span>
        <i className="fa fa-caret-right"></i>
        <span className="date">2018/6/6</span>
        <span className="date-type-select">Weekly</span>
        <i className="fa fa-caret-down"></i>
      </div>
    );
  }
};