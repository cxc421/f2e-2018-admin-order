import React from 'react';
import DropDown from 'components/DropDown';
import 'styles/TimeFilter.scss';

export default class TimeFilter extends React.PureComponent {
  state = {
    dateTypes: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Customer'],
    dateIndex: 1
  };  

  render() {
    const {dateTypes, dateIndex} = this.state;

    return (
      <div className="time-filter">
        <span className="date">2018/6/6</span>
        <i className="fa fa-caret-right"></i>
        <span className="date">2018/6/6</span>
        <DropDown className="date-filter-dropdown">
          <div dp-type="toggler" className="date-filter-toggler">
            <span className="date-type-select">{ dateTypes[dateIndex] }</span>
            <i className="fa fa-caret-down"></i>
          </div>
          <div dp-type="menu" className="hover-menu date-filter-menu">
          {
            dateTypes.map( (type, dateIndex) =>
              <div key={type} onClick={() => this.setState({dateIndex})}>{type}</div>
            )
          }
          </div>
        </DropDown>        
      </div>
    );
  }
};