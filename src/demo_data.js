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

// SAVE function
function save(type, newDate) {
  switch (type) {
    case 'orderData':
      orderData = newDate;
      break;
    case 'orderEditSection':
      orderEditSection = newDate;
      break;
    default:
      console.error('Unknow type:' + type);
  }
}

export {
  orderData,
  orderEditSection,
  save
};