import uuid from 'uuid/v4';

// ORDER_DATA
const ORDER_DATA_NUM = 10;
const orderData = [];
for (let i = 0; i < ORDER_DATA_NUM; i++) {
  const statusArray = ['Paid', 'Shipping', 'Unpaid', 'Done'];
  const randomNum = Math.round(Math.random() * (statusArray.length - 1));
  const status = statusArray[randomNum];

  const obj = {
    'order-id': uuid().substr(0, 4) + (i+1),
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

export {
  orderData
};