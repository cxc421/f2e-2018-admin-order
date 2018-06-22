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
import { transValueToMoney } from 'util/transValueToMoney';
// import { orderData, orderEditSection, save as saveDemoData } from '../demo_data';

export default class OrderPage extends React.Component {
  state = {    
    dataList: [
      {        
        product: {     
          checked: false,
          imgUrl: require('images/index01.png'),
          name: 'Mauris non tem.'
        },
        original: 3200,
        discount: 2800,
        status: 'published',
        spec: [
          {
            size: 'L',
            color: 'Gray',
            inventory: 15
          },
          {
            size: 'L',
            color: 'Black',
            inventory: 20
          },
          {
            size: 'M',
            color: 'Gray',
            inventory: 15
          },
          {
            size: 'M',
            color: 'Black',
            inventory: 20
          },
          {
            size: 'S',
            color: 'Gray',
            inventory: 15
          },
          {
            size: 'S',
            color: 'Black',
            inventory: 20
          }                    
        ]
      }
    ]
  };

  componentWillUnmount() {
    // saveDemoData('orderEditSection', this.state.editSection);
    // saveDemoData('orderData', this.state.dataList);
  }

  toogleCustomerCheck = (id, checked) => {

  };

  checkByStatus = (status) => {
  }

  updateStatusById = (id, status) => {
  };

  updateStatusToChecked = (status) => {
  };

  renderTdContent(data, tag) {
    const obj = data[tag];
    switch (tag) {
      case 'checked':
        return <CheckBox type="white" checked={obj} />        
      
      case 'product':
        return (
          <div className="product-row">
            <CheckBox type="white" checked={obj.checked} />
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
        return totalArr.map(arr => {
          return arr.length > 0 && (
            <div className="table-box-wrapper">
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
        let color = (obj === 'published' ? 'success' : 'secondary')
        return (
          <Button color={color}>
            <span>{obj}</span>
            <i className="fas fa-caret-down"></i>
          </Button>
        )

      default:
        return 1;
    }
  }

  render() {

    const { dataList } = this.state;
    const tagArray = ['product', 'original', 'discount', 'spec', 'status'];
    // const allChecked = !dataList.some(data => !data.customer.checked);
    const allChecked = false;

    return (
      <Page>
        <div className="product-page">

          <div className="top-menu-row">

            <CheckBox checked={allChecked} onClick={() => this.toogleCustomerCheck(null, !allChecked)} />

            <DropDown className="down-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="down-icon-toggler">
                <i className="fas fa-caret-down"></i>
              </div>
              <div dp-type="menu" className="hover-menu">
                <div onClick={() => this.toogleCustomerCheck(null, true)}>Select All</div>
                <div onClick={() => this.toogleCustomerCheck(null, false)}>Unselect All</div>
                <div onClick={() => this.checkByStatus('Published')}>Published</div>
                <div onClick={() => this.checkByStatus('Unpublished')}>Unpublished</div>
              </div>
            </DropDown>

            <DropDown className="tag-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="tag-icon-toggler" data-tip="Change Status" onMouseDown={() => ReactTooltip.hide()}>
                <i className="fas fa-tags"></i>
              </div>
              <div dp-type="menu" className="hover-menu">
                <div className="disabled">Change Status to...</div>
                <div onClick={() => this.updateStatusToChecked('Published')}>Published</div>
                <div onClick={() => this.updateStatusToChecked('Unpublished')}>Unpublished</div>
              </div>
            </DropDown>

            <Button color="dark" className="add-product-btn">
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
              dataList.map((data, idx) => 
                <tr key={`tr-${idx}`}>
                  {
                    tagArray.map((tag, idy) => 
                      <td key={`td-${idx}-${idy}`}>
                        {this.renderTdContent(data, tag)}
                      </td>
                    )
                  }
                </tr>
              )
            }
            </tbody>
          </Table>

          <div style={{height: 800, width: 0}}></div>

        </div>
      </Page>
    )
  }
}