import React from 'react';
import 'styles/ListCard.scss';

import Card from 'components/Card';
import SiteItem from 'components/SiteItem';

export default class ListCard extends React.PureComponent {

  renderSiteList(itemData) {
    return (
      <ul>
      {
        itemData.map((data, idx) => {
          return (
            <React.Fragment key={idx}>
              <SiteItem {...data} />
              <li className="line"></li>
            </React.Fragment>
          );
        })
      }
      </ul>
    );
  }

  renderOrderList() {
    return null;
  }

  render() {
    console.log(this.props);
    const { title , itemType, itemData} = this.props;

    return (
      <Card className="list-card">
        <h2>{title}</h2>
        {
          itemType === 'website' 
          ? this.renderSiteList(itemData)          
          : this.renderOrderList(itemData)
        }
      </Card>      
    );
  }

}