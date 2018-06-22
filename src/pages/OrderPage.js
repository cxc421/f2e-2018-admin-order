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
import { orderData } from '../demo_data';

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
    dataList: orderData
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

  toogleCustomerCheck = (id, checked) => {
    if (id == null) {
      this.setState(prevState => ({
        dataList: prevState.dataList.map(data => {
          return {...data, customer: {
            ...data.customer,
            checked
          }};
        })
      }));
    } else {
      this.setState(prevState => ({
        dataList: prevState.dataList.map(data => {
          if (data['order-id'] === id) {
            return {...data, customer: {
              ...data.customer,
              checked
            }};
          } else {
            return data;
          }
        })
      }));
    }
  };

  checkByStatus = (status) => {
    this.setState(prevState => ({
      dataList: prevState.dataList.map(data => {
        return {
          ...data, customer: {
            ...data.customer,
            checked: data.status === status
          }
        };
      })
    }));    
  }

  updateStatusById = (id, status) => {
    this.setState(prevState => ({
      dataList: prevState.dataList.map(data => {
        if (data['order-id'] === id) {
          return {
            ...data, status
          };
        } else {
          return data;
        }
      })
    }));
  };

  renderTdContent(data, tag) {
    const obj = data[tag];
    switch (tag) {
      case 'customer':
        return (
          <React.Fragment>
            <CheckBox checked={obj.checked} onClick={() => this.toogleCustomerCheck(data['order-id'], !obj.checked)}/>
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
      case 'status':
        const colorMap = {
          Paid: 'success',
          Unpaid: 'secondary',
          Shipping: 'warning',
          Done: 'primary'
        };
        const id = data['order-id'];
        return (
          <DropDown>
            <div dp-type="toggler">
              <Button className={obj} color={colorMap[obj]}>
                <span>{obj}</span>
                <i className="fas fa-caret-down"></i>
              </Button>            
            </div>
            <div dp-type="menu" className="hover-menu btn-menu">
              <div onClick={() => this.updateStatusById(id, 'Paid')}>Paid</div>
              <div onClick={() => this.updateStatusById(id, 'Unpaid')}>Unpaid</div>
              <div onClick={() => this.updateStatusById(id, 'Shipping')}>Shipping</div>
              <div onClick={() => this.updateStatusById(id, 'Done')}>Done</div>
            </div>
          </DropDown>          
        );
      default:
        return obj;
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
    const tagArray = ['order-id', 'customer', 'product-list', 'total', 'add-to-chart', 'check-out', 'address', 'phone', 'email', 'status'];
    const allChecked = ! dataList.some(data => !data.customer.checked);    

    return (
      <Page>
        <div className="order-page">

          <div className="top-menu-row">

            <CheckBox checked={allChecked} onClick={() => this.toogleCustomerCheck(null, !allChecked) } />
            <i className="fas fa-caret-down down-icon"></i>
            
            <DropDown className="tag-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="tag-icon-toggler">
                <i className="fas fa-tags"></i>              
              </div>            
              <div dp-type="menu" className="hover-menu">
                <div onClick={() => this.toogleCustomerCheck(null, true)}>Select All</div>
                <div onClick={() => this.toogleCustomerCheck(null, false)}>Unselect All</div>
                <div onClick={() => this.checkByStatus('Paid')}>Paid</div>
                <div onClick={() => this.checkByStatus('Unpaid')}>Unpaid</div>
                <div onClick={() => this.checkByStatus('Shipping')}>Shipping</div>
                <div onClick={() => this.checkByStatus('Done')}>Done</div>
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

          <Table className="order-table" borderless={true} striped={false} >
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
                dataList.map((data, idx) => {
                  let className = "";
                  if (data.status === 'Unpaid') {
                    className = "grey";
                  } else if (data.status === "Done") {
                    className = "grey delete";
                  }

                  return (
                    <tr key={idx} className={className}>
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
                  );
                })
              }
            </tbody>
          </Table>          

        </div>
      </Page>
    )
  }
}