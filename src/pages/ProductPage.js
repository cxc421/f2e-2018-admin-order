import React from 'react';
import {
  Table,
  Button,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import 'styles/ProductPage.scss';

import Page from 'components/Page';
import CheckBox from 'components/CheckBox';
import DropDown from 'components/DropDown';
import AddProductModal from 'components/AddProductModal';
import { transValueToMoney } from 'util/transValueToMoney';
import { productData, save as saveDemoData } from '../demo_data';

export default class OrderPage extends React.Component {
  state = {    
    modalOpen: false,
    dataList: productData
  };

  componentWillUnmount() {
    saveDemoData('productData', this.state.dataList);
  }

  toggleProductCheck = (id, checked) => {
    if (id == null) {
      this.setState(prevState => ({
        dataList: prevState.dataList.map(data => ({
          ...data,
          product: {
            ...data.product,
            checked
          }
        }))
      }));
    } else {
      this.setState(prevState => ({
        dataList: prevState.dataList.map(data => {
          if (data.id !== id) {
            return data;
          }
          return {
            ...data,
            product: {
              ...data.product,
              checked
            }
          }
        })
      }));      
    }
  };

  checkByStatus = (status) => {
    
    this.setState(prevState => ({
      dataList: prevState.dataList.map(data => {
        if (data.status === status) {
          return {
            ...data,
            product: {
              ...data.product,
              checked: true
            }
          };
        } else {
          return {
            ...data,
            product: {
              ...data.product,
              checked: false
            }
          };
        }
      })
    }));    
  }

  updateStatusById = (id, status) => {
    this.setState(prevState => ({
      dataList: prevState.dataList.map(o => {
        if (o.id === id) {
          return {...o, status};
        } else {
          return o;
        }
      })
    }));
  };

  updateStatusToChecked = (status) => {
    this.setState(prevState => ({
      dataList: prevState.dataList.map(data => {
        if (data.product.checked) {
          return {
            ...data,
            status
          }
        }
        return data;
      })
    }));
  };

  onModalToggle = () => {
    this.setState(prevState => ({
      modalOpen: ! prevState.modalOpen
    }));  
  };

  onNewProductAdd = (newSpec) => {
    this.setState(prevState => {
      const obj = {
        dataList: [
          ...prevState.dataList,
          newSpec
        ]
      };

      // console.log(obj);

      return obj;
    });
  };

  renderTdContent(data, tag) {
    const obj = data[tag];
    switch (tag) {
      case 'checked':
        return <CheckBox type="white" checked={obj} />        
      
      case 'product':
        return (
          <div className="product-row">
            <CheckBox type="white" checked={obj.checked} onClick={() => this.toggleProductCheck(data.id, !obj.checked)}/>
            <img src={obj.imgUrl} alt=""/>
            <span>{obj.name}</span>
          </div>
        );

      case 'original':
      case 'discount':
        return '$' + transValueToMoney(obj);

      case 'spec': {
        const arrL = [];
        const arrM = [];
        const arrS = [];

        obj.forEach(o => {
          switch(o.size) {
            case 'L':
              arrL.push(o);
              break;
            case 'M':
              arrM.push(o);
              break;
            case 'S':
              arrS.push(o);
              break;
          }
        });

        const totalArr = [arrL, arrM, arrS];
        return totalArr.map((arr, idArr) => {
          return arr.length > 0 && (
            <div className="table-box-wrapper" key={idArr}>
            {
              arr.map((o, idx) => {
                return (
                  <div className="table-box" key={idx}>
                    <span className={idx !== 0 ? "table-box-hide": ""}>{o.size}</span>
                    <span className="table-box-color">{o.color}</span>
                    <span>{o.inventory}</span>
                  </div>
                )
              })
            }
            </div>
          );
        });
      }

      case 'status':
        let color = (obj === 'published' ? 'success' : 'secondary');
        return (
          <DropDown>
            <div dp-type="toggler">
              <Button color={color}>
                <span>{obj}</span> 
                <i className="fas fa-caret-down"></i>
              </Button>
            </div>
            <div dp-type="menu" className="hover-menu btn-menu">
              <div onClick={() => this.updateStatusById(data.id, 'published')}>PUBLISHED</div>
              <div onClick={() => this.updateStatusById(data.id, 'unpublished')}>UNPUBLISHED</div>
            </div>
          </DropDown>          
        );

      default:
        return obj;
    }
  }

  render() {

    const { dataList, modalOpen } = this.state;
    const tagArray = ['product', 'original', 'discount', 'spec', 'status'];
    const allChecked = !dataList.some(data => !data.product.checked);

    return (
      <Page>
        <div className="product-page">

          <div className="top-menu-row">

            <CheckBox checked={allChecked} onClick={() => this.toggleProductCheck(null, !allChecked)} />

            <DropDown className="down-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="down-icon-toggler">
                <i className="fas fa-caret-down"></i>
              </div>
              <div dp-type="menu" className="hover-menu">
                <div onClick={() => this.toggleProductCheck(null, true)}>Select All</div>
                <div onClick={() => this.toggleProductCheck(null, false)}>Unselect All</div>
                <div onClick={() => this.checkByStatus('published')}>Published</div>
                <div onClick={() => this.checkByStatus('unpublished')}>Unpublished</div>
              </div>
            </DropDown>

            <DropDown className="tag-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="tag-icon-toggler" data-tip="Change Status" onMouseDown={() => ReactTooltip.hide()}>
                <i className="fas fa-tags"></i>
              </div>
              <div dp-type="menu" className="hover-menu">
                <div className="disabled">Change Status to...</div>
                <div onClick={() => this.updateStatusToChecked('published')}>Published</div>
                <div onClick={() => this.updateStatusToChecked('unpublished')}>Unpublished</div>
              </div>
            </DropDown>

            <Button color="dark" className="add-product-btn" onClick={this.onModalToggle}>
              <span>ADD NEW PRODUCT</span>
              <i className="fas fa-plus"></i>
            </Button>

            <ReactTooltip effect="solid" place="bottom" offset={{ top: -8 }} className="product-page-tooltip" />
          </div>

          <Table className="product-table" borderless={true} striped={false} >
            <thead>
              <tr>                
                <th>Product</th>
                <th>Original</th>
                <th>Discount</th>
                <th>
                  <div className="table-box">
                    <span>Size</span>
                    <span>Color</span>
                    <span>Inventory</span>
                  </div>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {
              dataList.map((data, idx) => {
                const className = data.status === 'published' ? '' : 'grey';

                return (
                  <tr key={`tr-${idx}`} className={className} >
                    {
                      tagArray.map((tag, idy) =>
                        <td key={`td-${idx}-${idy}`}>
                          {this.renderTdContent(data, tag)}
                        </td>
                      )
                    }
                  </tr>
                );
              })
            }
            </tbody>
          </Table>

          <AddProductModal 
            isOpen={modalOpen} 
            onModalToggle={this.onModalToggle} 
            onNewProductAdd={this.onNewProductAdd} 
          />

        </div>
      </Page>
    )
  }
}