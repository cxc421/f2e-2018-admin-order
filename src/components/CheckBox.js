import React from 'react';
import 'styles/CheckBox.scss';

export default class CheckBox extends React.PureComponent {

  render() {
    const { checked = false, type = "", onClick: callback = f => f } = this.props;

    return (
      <div className={`checkbox ${type} ${ checked ? 'checked' : '' }`}
        onClick={() => callback(!checked)}
      >      
        <i className="fas fa-check"></i>
      </div>
    );
  }

}