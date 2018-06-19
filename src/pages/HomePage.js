import React from 'react';
import 'styles/HomePage.scss';

import Page from 'components/Page';
import TimeFilter from 'components/TimeFilter';
import CostCard from 'components/CostCard';
import ChartCard from 'components/ChartCard';
import ListCard from 'components/ListCard';

export default class HomePage extends React.PureComponent {

  render() {

    const websiteData = [
      {
        name: 'facebook',
        views: 45836,
        previous: 38137
      },
      {
        name: 'google',
        views: 23582,
        previous: 22122
      },
      {
        name: 'yahoo',
        views: 2489,
        previous: 2503
      },
      {
        name: 'wordpress',
        views: 1057,
        previous: 1634
      }
    ];

    const orderData = [
      {
        imgUrl: require("images/index01.png"),
        title: "Vintage T-shirt",
        date: '2018/6/13 13:42',
        client: "Bella Willis",
        total: 3200
      },
      {
        imgUrl: require("images/index02.png"),
        title: "Cowboy Jacket",
        date: '2018/6/13 10:45',
        client: "Andrian Cummings",
        total: 2800
      },
      {
        imgUrl: require("images/index03.png"),
        title: "Coach Coast",
        date: '2018/6/13 8:26',
        client: "Lura Holland",
        total: 1600
      }             
    ]

    return (
      <Page>
        <div className="home-page">

          <div className="top-area">
            <h1 className="title">OVERVIEW</h1>
            <div className="time-filter-area">
              <TimeFilter />
            </div>
          </div>

          <div className="card-area">
            <CostCard 
              title="TOTAL REVENUE"
              icon="hand"
              color="green"
              value="54540"
            />
            <CostCard
              title="TOTAL COST"
              icon="boxes"
              color="red"
              value="12660"
            />
            <CostCard
              title="NET INCOME"
              icon="money"
              color="blue"
              value="41880"
            />
          </div>

          <div className="card-area">
            <ChartCard />
          </div>

          <div className="card-area">
            <ListCard title="Transaction Website" itemType="website" itemData={websiteData} />
            <ListCard title="Latest Orders" itemType="order" itemData={orderData} />
          </div>

        </div>        
      </Page>
    )
  }
}