import uuid from 'uuid/v4';

// ORDER EDIT SECTION
let orderEditSection = [
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
];


// ORDER_DATA
const ORDER_DATA_NUM = 10;
let orderData = [];
for (let i = 0; i < ORDER_DATA_NUM; i++) {
  const statusArray = ['Paid', 'Shipping', 'Unpaid', 'Done'];
  const randomNum = Math.round(Math.random() * (statusArray.length - 1));
  const status = statusArray[randomNum];

  const obj = {
    'order-id': 'A7CE-' + (i+1),
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
    status: status,
    phone: '0920-849-117',
    email: 'user@gmail.com'
  };
  orderData.push(obj);
}

// PRODUCT DATA
const productDataProto = {
    id: 0,
    product: {
      checked: false,
      imgUrl: '',
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
  };

const PRODUCT_DATA_NUM = 3;
let productData = [];
const imgs = {
  IMG_1 : require('images/index01.png'),
  IMG_2 : require('images/index02.png'),
  IMG_3 : require('images/index03.png')
};
for (let i = 0; i < PRODUCT_DATA_NUM; i++) {
  productData.push({
    ...productDataProto,
    id: uuid(),
    product: {
      ...productDataProto.product,
      imgUrl: imgs['IMG_' + ((i%3) + 1)]
    },
    status: (i < 2) ? 'published' : 'unpublished'
  });
}

// SAVE function
function save(type, newData) {
  switch (type) {
    case 'orderData':
      orderData = newData;
      break;
    case 'orderEditSection':
      orderEditSection = newData;
      break;
    case 'productData':
      productData = newData;
      break;
    default:
      console.error('Unknow type:' + type);
  }
}

export {
  orderData,
  orderEditSection,
  productData,
  save
};