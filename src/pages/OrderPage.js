import React from 'react';
import { 
  Table,
  Button,
  Pagination, PaginationItem, PaginationLink  
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import 'styles/OrderPage.scss';

import Page from 'components/Page';
import CheckBox from 'components/CheckBox';
import DropDown from 'components/DropDown';
import { transValueToMoney } from 'util/transValueToMoney';
import { orderData, orderEditSection, save as saveDemoData } from '../demo_data';

export default class OrderPage extends React.Component {
  state = {
    editSection: orderEditSection,
    dataList: orderData
  };

  componentWillUnmount() {
    saveDemoData('orderEditSection', this.state.editSection);
    saveDemoData('orderData', this.state.dataList);
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

  updateStatusToChecked = (status) => {    
    this.setState(prevState => ({
      dataList: prevState.dataList.map(data => {
        if (data.customer.checked) {          
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
            <CheckBox type="white" checked={obj.checked} onClick={() => this.toogleCustomerCheck(data['order-id'], !obj.checked)}/>
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
           
            <DropDown className="down-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="down-icon-toggler">
                <i className="fas fa-caret-down"></i>              
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

            <DropDown className="tag-icon" keepMenuOpen={false}>
              <div dp-type="toggler" className="tag-icon-toggler" data-tip="Change Status" onMouseDown={() => ReactTooltip.hide()}>
                <i className="fas fa-tags"></i>
              </div>
              <div dp-type="menu" className="hover-menu">
                <div className="disabled">Change Status to...</div>
                <div onClick={() => this.updateStatusToChecked('Paid')}>Paid</div>
                <div onClick={() => this.updateStatusToChecked('Unpaid')}>Unpaid</div>
                <div onClick={() => this.updateStatusToChecked('Shipping')}>Shipping</div>
                <div onClick={() => this.updateStatusToChecked('Done')}>Done</div>
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

            <ReactTooltip effect="solid" place="bottom" offset={{ top: -8 }} className="order-page-tooltip"/>
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

          <div className="pagination-row">
            <Pagination aria-label="Order Page Navigation" className="order-pagination">
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink>
                  1
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                  2
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                  3
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                  4
          </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                  5
          </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next />
              </PaginationItem>
            </Pagination>          
          </div>
          
        </div>
      </Page>
    )
  }
}