import React from 'react';
import  uuid from 'uuid/v4';
import 'styles/DropDown.scss';

import { closest } from 'util/closest';

export default class DropDown extends React.Component {

  WRAPPER_ID = uuid();

  state = {
    hideMenu: true
  };

  toggleMenu = (e) => {
    this.setState(prevState => ({
      hideMenu: !prevState.hideMenu
    }));
  }

  updateValue = (newValue) => {
    const {value, onChange = f => f } = this.props;
    if (value !== newValue) {
      onChange(newValue);
    }
  };

  windowClickEvent = (e) => {
    if (! this.state.hideMenu) {
      const target = e.target;
      // if (! target.getAttribute('dp-type')) {
      //   console.log('hide-1');
      //   return this.setState({hideMenu: true});
      // }
      const wrapper = closest(target, '[dp-type="wrapper"]');
      if (!wrapper || wrapper.getAttribute('data-id') !== this.WRAPPER_ID) {
        // console.log('hide-2');
        return this.setState({ hideMenu: true });
      }
    }
    // console.log('click');
    
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.windowClickEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.windowClickEvent);
  }

  render() {

    const { children, className = "", keepMenuOpen } = this.props;
    let dpToggler = null;
    let dpMenu = null;

    if (children && children.find) {
      dpToggler = children.find(child => child.props['dp-type'] === 'toggler');
      if (dpToggler) {
        dpToggler = React.cloneElement(
          dpToggler,
          {
            onClick: this.toggleMenu
          }
        )
      }

      dpMenu = children.find(child => child.props['dp-type'] === 'menu');
      if (dpMenu) {
        // const dpOptions = React.Children.map(dpMenu.props.children, child =>
        //   React.cloneElement(child, {
        //     // ['data-checked']: value === child.props.value,
        //     // onClick: () => this.updateValue(child.props.value)
        //   })
        // );
        const dpOptions = dpMenu.props.children;

        const style = {
          display: this.state.hideMenu ? 'none' : 'block'
        };

        dpMenu = React.cloneElement(
          dpMenu,
          {
            className: `dp-menu ${dpMenu.props.className ? dpMenu.props.className : '' }`,
            style,
            children: dpOptions,
            onClick: keepMenuOpen ? undefined : this.toggleMenu
          }
        );
      }

      return (
        <div 
          className={`dp-wrapper ${ className ? className : '' }`} 
          dp-type="wrapper"
          data-id={this.WRAPPER_ID}
        >
          { dpToggler }
          { dpMenu }
        </div>
      );
    }

  }

}