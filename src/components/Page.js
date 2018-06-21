import React from 'react';
import 'styles/Page.scss';

export default class Page extends React.PureComponent {
  render() {
    return (
      <div className="page">
        <div className="wrapper">
          {this.props.children}        
        </div>
      </div>      
    );
  }
}