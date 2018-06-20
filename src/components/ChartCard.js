import React from 'react';
import 'styles/ChartCard.scss';

import Card from 'components/Card';
import ChartCanvas from 'components/ChartCanvas';

export default class ChartCard extends React.PureComponent {

  render() {
    return (
      <Card className="chart-card">
        <h2>Activity</h2>
        <div className="chart-area">
          <ChartCanvas />
        </div>
      </Card>
    );
  }
} 