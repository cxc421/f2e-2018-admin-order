import React from 'react';
import { 
  Table,
  Button
} from 'reactstrap';
import 'styles/OrderPage.scss';

import Page from 'components/Page';
import CheckBox from 'components/CheckBox';
import DropDown from 'components/DropDown';
import { transValueToMoney } from 'util/transValueToMoney';

export default class OrderPage extends React.Component {
  state = {
    editSection: [
      {
        id: 'order-id',
        text: 'Order ID',
        checked: false
      },
      {
        id: 'customer',
        text: 'Customer',
        checked: true
      },
      {
        id: 'product-list',
        text: 'Product List',
        checked: true
      },
      {
        id: 'total',
        text: 'Total',
        checked: true
      },
      {
        id: 'add-to-chart',
        text: 'Add to Chart',
        checked: true
      },
      {
        id: 'check-out',
        text: 'Check-out',
        checked: true
      },
      {
        id: 'address',
        text: 'Address',
        checked: true
      },
      {
        id: 'phone',
        text: 'Phone',
        checked: false
      },
      {
        id: 'email',
        text: 'Email',
        checked: false
      },
      {
        id: 'status',
        text: 'Status',
        checked: true
      }
    ],
    dataList: [
      {
        'order-id': 1,
        customer: {
          checked: false,
          name: 'Ian Medina'
        },
        'product-list': [
          {
            name: 'Vestibulum.',
            money: 1400,
            number: 1
          },
          {
            name: 'Fusce vehicu.',
            money: 800,
            number: 1
          }
        ],
        total: 2200,
        'add-to-chart': '2018/6/8 13:39',
        'check-out': '2018/6/8 20:23',
        address: '386 Windler Drives Apt. 358',
        status: 'Paid'
      }
    ]
  }

  updateEditSection(id, checked) {
    this.setState(prevState => ({
      editSection: prevState.editSection.map(edit => {
        if (edit.id === id) {
          return {
            ...edit,
            checked
          };
        } else {
          return edit;
        }
      })
    }));
  }

  renderTdContent(data, tag) {
    const obj = data[tag];
    switch (tag) {
      case 'customer':
        return (
          <React.Fragment>
            <CheckBox checked={obj.checked}/>
            <span>{obj.name}</span>
          </React.Fragment>
        );
      case 'product-list':
        return obj.map((product, idx) => (
          <div className="table-box" key={idx}>
            <div>{product.name}</div>
            <div>
              <span className="grey">{ '$' + transValueToMoney(product.money) }</span>
              <span>{product.number}</span>
            </div>
          </div>
        ))
    
      case 'total':
        return '$' + transValueToMoney(obj);
      case 'add-to-chart':
        return obj;
      case 'check-out':
        return obj;
      case 'address':
        return obj;
      case 'status':
        return (
          <Button className={obj} color="success">
            <span>{obj}</span>
            <i className="fas fa-caret-down"></i>
          </Button>
        );
      default:
        return 123;
    }
  }

  render() {

    const { editSection, dataList } = this.state;
    const enableTags = editSection.reduce((tot, edit) => {
      if (!edit.checked) {
        return tot;
      }
      return {...tot, [edit.id]: true};
    }, {});
    const tagArray = ['order-id', 'customer', 'product-list', 'total', 'add-to-chart', 'check-out', 'address', 'status'];
    

    return (
      <Page>
        <div className="order-page">

          <div className="top-menu-row">

            <CheckBox />
            <i className="fas fa-caret-down down-icon"></i>
            
            <DropDown className="tag-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="tag-icon-toggler">
                <i className="fas fa-tags"></i>              
              </div>            
              <div dp-type="menu" className="tag-icon-menu">
                <div>Select All</div>
                <div>Unselect All</div>
                <div>Paid</div>
                <div>Unpaid</div>
                <div>Shipping</div>
                <div>Done</div>
              </div>
            </DropDown>

            <DropDown className="edit-section" keepMenuOpen={true}>
              <div dp-type="toggler" className="edit-text">
                EDIT SECTION
                <i className="fas fa-caret-down"></i>
              </div>
              <div dp-type="menu" className="edit-menu">     
                {
                  editSection.map(edit => {
                    return (
                      <div 
                        dp-type="option" 
                        key={edit.id} 
                        onClick={() => this.updateEditSection(edit.id, !edit.checked)}
                      >
                        <CheckBox checked={edit.checked} />
                        <div>{edit.text}</div>
                      </div>
                    );
                  })
                }
              </div>
            </DropDown>

          </div>

          <Table className="order-table" borderless={true} striped={true} >
            <thead>
              <tr>
                {
                  editSection.map((edit, idx) => edit.checked &&
                    <th key={`th-${idx}`}>
                      {edit.text}
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                dataList.map((data, idx) => 
                  <tr key={idx}>
                    {
                      tagArray.map((tag, idy) => 
                        enableTags[tag] ?
                        <td key={idx + '-' + idy}>
                          {
                            this.renderTdContent(data, tag)
                          }
                        </td> :
                        null
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </Table>          

        </div>
      </Page>
    )
  }
}