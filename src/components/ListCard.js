import React from 'react';
import 'styles/ListCard.scss';

import Card from 'components/Card';
import SiteItem from 'components/SiteItem';
import OrderItem from 'components/OrderItem';

export default class ListCard extends React.PureComponent {

  render() {
    // console.log(this.props);
    const { title , itemType, itemData} = this.props;
    const Item = (itemType === 'website') ? SiteItem : OrderItem ; 

    return (
      <Card className="list-card">
        <h2>{title}</h2>
        <ul>
          {
            itemData.map((data, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Item {...data} />
                  <li className="line"></li>
                </React.Fragment>
              );
            })
          }
        </ul>
      </Card>      
    );
  }

}