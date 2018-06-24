import React from 'react';
import {
  Modal, 
  Button,
  Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon
} from 'reactstrap';
import uuid from 'uuid/v4';
import 'styles/AddProductModal.scss';

// demo
import IMG_1 from 'images/index01.png';
import IMG_2 from 'images/index02.png';
import IMG_3 from 'images/index03.png';

export default class AddProductModal extends React.Component {
  defaultProduct = {
    id: null,
    status: null,
    product: {
      checked: false,
      imgUrl: '',
      name: '',
      discription: ''
    },
    original: 1000,
    discount: 1000,
    spec: [
      {
        size: 'L',
        color: '',
        inventory: 1        
      }  
    ]    
  };

  state = {
    ...this.defaultProduct,
    imgSelectList: [
      IMG_1, IMG_2, IMG_3, IMG_2, IMG_1
    ],
    imgSelectIndex: 0
  };

  updateProductName = (e) => {
    const name = e.target.value;
    
    this.setState(prev => {
      return {
        product: {
          ...prev.product,
          name
        }
      };
    });
  }

  updateProductDiscription = (e) => {
    const discription = e.target.value;

    this.setState(prev => {
      return {
        product: {
          ...prev.product,
          discription
        }
      };
    });    
  }

  updateMoney = (prop, value) => {
    this.setState(prev => ({
      [prop]: value
    }));
  }

  updateSpecData = (index, prop, value) => {
    this.setState(prev => ({
      spec: prev.spec.map((specData,idx) => {
        if (idx === index) {
          return {
            ...specData,
            [prop]: value
          };
        } else {
          return specData;
        }
      })
    }));
  }; 

  addNewSpec = () => {
    this.setState(prev => ({
      spec: [...prev.spec, {
        size: 'L',
        color: '',
        inventory: 1        
      }]
    }));
  }

  updateSelectImgIndex = (index) => {
    this.setState({
      imgSelectIndex: index
    });
  }

  onPublish = (status = "unpublish") => {
    const {imgSelectIndex, imgSelectList, ...newPublishData} = this.state;

    newPublishData.status = status;
    newPublishData.id = uuid();
    newPublishData.product.imgUrl = imgSelectList[imgSelectIndex];
    // console.log(newPublishData);

    this.props.onNewProductAdd(newPublishData);
    this.props.onModalToggle();

    this.setState({
      ...this.defaultProduct
    });
  }

  render() {
    const { isOpen, onModalToggle } = this.props;
    const {
      product,
      original,
      discount,
      spec,
      imgSelectIndex,
      imgSelectList
    } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={onModalToggle} className="add-product-modal">
        <div className="add-product-modal-header">
          <span>ADD NEW PRODUCT</span>
          <i className="fas fa-times close-modal" onClick={onModalToggle}></i>
        </div>
        <div className="add-product-modal-body">
          <div className="left">
            <div className="upload-area">
              <i className="fas fa-cloud-upload-alt upload-img"></i>
              <div className="upload-text">Drag an image or click here to upload...</div>
            </div>
            <div className="img-area">
            {
              imgSelectList.map((imgUrl, index) => {
                const className = (index === imgSelectIndex) ? 'select' : '';
                return <div key={index} style={{ backgroundImage: `url(${imgUrl})` }} className={className}
                  onClick={() => this.updateSelectImgIndex(index)}
                ></div>;
              })
            }              
            </div>
          </div>
          <div className="right">
            <Form onSubmit={e => e.preventDefault()}>
              <h2>Product Discription</h2>
              <FormGroup className="mb-20">
                <Input type="text" placeholder="Title" className="mt-8" required={true}
                  value={product.name}
                  onChange={this.updateProductName}
                />                
                <Input type="textarea" placeholder="Discription" className="mt-8" required={true}
                  value={product.discription}
                  onChange={this.updateProductDiscription}
                />
              </FormGroup>            
              
              <h2>Price</h2>
              <FormGroup inline check={true} className="mb-20">
                <InputGroup className="mt-8 mr-8">
                  <InputGroupAddon addonType="prepend">Original</InputGroupAddon>
                  <Input type="number" min="0" required={true} 
                    value={original}
                    onChange={e => this.updateMoney('original', e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="mt-8 mr-8">
                  <InputGroupAddon addonType="prepend">Discount</InputGroupAddon>
                  <Input type="number" min="0" required={true} 
                    value={discount}
                    onChange={e => this.updateMoney('discount', e.target.value)}                  
                  />
                </InputGroup>
              </FormGroup>

              <h2>Specification</h2>
              {
                spec.map((specData, idx) =>
                  <FormGroup inline check={true} key={idx}>
                    <InputGroup className="mt-8 mr-8">
                      <InputGroupAddon addonType="prepend">Size</InputGroupAddon>
                      <Input type="select" 
                        value={specData.size} 
                        onChange={e => this.updateSpecData(idx, 'size', e.target.value)} required={true}
                      >
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="S">S</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mt-8 mr-8">
                      <InputGroupAddon addonType="prepend">Color</InputGroupAddon>
                      <Input type="text" required={true} 
                        value={specData.color}
                        onChange={e => this.updateSpecData(idx, 'color', e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mt-8 mr-8">
                      <InputGroupAddon addonType="prepend">Inventory</InputGroupAddon>
                      <Input type="number" min="0" required={true} 
                        value={specData.inventory}
                        onChange={e => this.updateSpecData(idx, 'inventory', e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                )
              }

              <Button type="button" color="dark" block={true} className="mt-8 add-spec-btn"
                onClick={this.addNewSpec}
              >
                <span>ADD NEW SPECIFICATION</span>
                <i className="fas fa-plus"></i>
              </Button>

              <div className="publish-row">
                <Button color="secondary mr-8 save-draft-btn" outline={true}
                  onClick={() => this.onPublish('unpublished')}
                >
                  SAVE DRAFT
                </Button>
                <Button color="dark"
                  onClick={() => this.onPublish('published')}
                >PUBLISH</Button>
              </div>

            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

