import React from 'react';
import ReactTooltip from 'react-tooltip';
import 'styles/ChartCanvas.scss';

import { transValueToMoney } from 'util/transValueToMoney';

const toolTipContentFuncProto = fontAwesomeClassName => value =>
  <React.Fragment>
    <i className={fontAwesomeClassName}></i>
    <span>
      {transValueToMoney(value)}
    </span>
  </React.Fragment>
;


export default class ChartCanvas extends React.PureComponent {

  static defaultProps = {
    chartTopMargin: 17,
    chartRightMargin: 0,
    chartLeftMargin: 70,
    chartBottomMargin: 40,
    chartLeftPadding: 30,
    chartRightPadding: 30,
    yTicksRange: [0, 8000],
    yTicksNum  : 9,
    yTicksDisplayFunc: (value, idx) => {
      if (idx % 2 === 1) {
        return "";
      }
      return transValueToMoney(value);
    },
    xTicksRange: [6, 13],
    xTicksNum: 8,
    xTicksDisplayFunc: value => {
      return value + ' JUN';
    },
    data: [
      [{ x: 6, y: 800 }, { x: 7, y: 800 }, { x: 8, y: 2700 }, { x: 9, y: 2950 }, { x: 10, y: 2360 }, { x: 11, y: 670 }, { x: 12, y: 920 }, { x: 13, y: 1950 }, ],
      [{ x: 6, y: 6100 }, { x: 7, y: 5300 }, { x: 8, y: 1900 }, { x: 9, y: 4100 }, { x: 10, y: 3700 }, { x: 11, y: 5400 }, { x: 12, y: 6700 }, { x: 13, y: 4960 },],
      [{ x: 6, y: 7400 }, { x: 7, y: 6950 }, { x: 8, y: 5400 }, { x: 9, y: 7500 }, { x: 10, y: 5600 }, { x: 11, y: 6200 }, { x: 12, y: 7600 }, { x: 13, y: 7300 },]
    ],
    dataColor: [
      '#d0021b',
      '#4a90e2',
      '#7ed321'
    ],
    pointClassName: [
      'red',
      'blue',
      'green'
    ],
    toolTipContentFunc: [
      toolTipContentFuncProto('fas fa-boxes'),
      toolTipContentFuncProto('fas fa-money-bill'),
      toolTipContentFuncProto('fas fa-hand-holding-usd'),
    ]
  };

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  render() {

    const { 
      data, 
      pointClassName:styleClassArray,
      toolTipContentFunc
    } = this.props;

    return (
      <div className="chart-canvas">
        <canvas ref={this.canvasRef}></canvas>
        {
          data.map((lineData, lineIdx) => 
            lineData.map((point, pointIdx) => {
              const styleClassName = styleClassArray[lineIdx];
              const pointClassName = 'chart-point ' + styleClassName;
              const tooltipClassName = 'chart-point-tooltip ' + styleClassName;
              const tooltipContent = toolTipContentFunc[lineIdx];

              const id = lineIdx + '-' + pointIdx;
              const pointId = 'point-' + id;
              const tooltipId = 'tooltip-' + id;

              return (
                <React.Fragment key={id}>
                  <div
                    id={pointId} 
                    className={pointClassName} 
                    data-tip 
                    data-for={tooltipId}
                    onMouseEnter={this.renderChart.bind(this, lineIdx)}
                    onMouseLeave={this.renderChart.bind(this, -1)}
                  >
                  </div>
                  <ReactTooltip 
                    effect="solid" 
                    id={tooltipId} 
                    className={tooltipClassName}
                  >
                    {
                      tooltipContent(point.y)
                    }
                  </ReactTooltip>                  
                </React.Fragment>
              );
            })
          )
        }
      </div>
    );
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart( focusLineId = -1 ) {
    const canvas = this.canvasRef.current;
    const parentNode = canvas.parentNode;

    canvas.width = parentNode.clientWidth;
    canvas.height = parentNode.clientHeight;

    this.renderYAxis();
    this.renderXAxis();
    this.renderLine(focusLineId);
  }

  renderLine( focusLineId ) {
    const {
      chartLeftMargin,
      chartRightMargin,
      chartLeftPadding,
      chartRightPadding,
      chartTopMargin,
      chartBottomMargin,
      xTicksRange,
      yTicksRange,
      data,
      dataColor
    } = this.props;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');    

    const xPosMin = chartLeftMargin + chartLeftPadding;
    const xPosMax = canvas.width - chartRightMargin - chartRightPadding;
    const xValMin = xTicksRange[0];
    const xValMax = xTicksRange[1];

    const yPosMin = canvas.height - chartBottomMargin;
    const yPosMax = chartTopMargin;
    const yValMin = yTicksRange[0];
    const yValMax = yTicksRange[1];


    const getPos = (posMin, posMax, valMin, valMax, valCur) => {
      const result = (valCur - valMin) * (posMax - posMin) / (valMax - valMin) + posMin;
      return Math.round(result);
    };

    for(let i = 0; i < data.length; i++) {
      const lineData = data[i];
      const lineColor = dataColor[i];

      ctx.lineWidth = (i !== focusLineId) ? 2 : 4;
      ctx.strokeStyle = lineColor;
      ctx.beginPath();

      for(let j = 0; j < lineData.length; j++) {
        const d = lineData[j];
        const xPos = getPos(xPosMin, xPosMax, xValMin, xValMax, d.x);
        const yPos = getPos(yPosMin, yPosMax, yValMin, yValMax, d.y);
        // console.log('xPos = ' + xPos);
        // console.log('yPos = ' + yPos);
        if (j!==0) {
          ctx.lineTo(xPos, yPos);
        } else {
          ctx.moveTo(xPos, yPos);
        }

        
        // test
        let point = canvas.parentNode.querySelector(`#point-${i}-${j}`);
        point.style.left = xPos + 'px';
        point.style.top = yPos + 'px';
        point.style.display = "block";
      }
      ctx.stroke();
    }
  }

  renderXAxis() {
    const {
      chartLeftMargin,
      chartRightMargin,
      chartLeftPadding,
      chartRightPadding,
      xTicksDisplayFunc,
      xTicksRange,
      xTicksNum
    } = this.props;
    
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const xBegin = chartLeftMargin + chartLeftPadding;
    const xEnd = canvas.width - chartRightMargin - chartRightPadding;
    const xStep = Math.round((xEnd - xBegin) / (xTicksNum - 1));

    const xValBegin = xTicksRange[0];
    const xValEnd  = xTicksRange[1];
    const xValStep = (xValEnd - xValBegin) / (xTicksNum - 1);

    ctx.fillStyle = '#9b9b9b';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `200 16px "Helvetica Neue", Helvetica, Arial, sans-serif`;

    const yPos = canvas.height - 10;
    for(let i = 0; i < xTicksNum; i++) {
      const xVal = xValBegin + i * xValStep;
      const xPos = xBegin + i * xStep;
      ctx.fillText(xTicksDisplayFunc(xVal, i), xPos, yPos); 
    }
  }

  renderYAxis() {
    const {
      yTicksNum,
      chartTopMargin,
      chartLeftMargin,
      chartRightMargin,
      chartBottomMargin,
      yTicksRange,
      yTicksDisplayFunc
    } = this.props;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const lineWidth = 1;
    const yStart = chartTopMargin;
    const yEnd = canvas.height - chartBottomMargin;
    const yStep  = Math.round( (yEnd - yStart) / (yTicksNum - 1) );

    const yValueStep = (yTicksRange[1] - yTicksRange[0]) / (yTicksNum - 1);
    const yValueStart = yTicksRange[1];

    const xStart = chartLeftMargin;
    const xEnd = canvas.width - chartRightMargin;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle= '#ebebeb';
    ctx.fillStyle = '#9b9b9b';
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.font = `200 16px "Helvetica Neue", Helvetica, Arial, sans-serif`;
 
    for (let i = 0; i < yTicksNum; i++) {
      const yPos = yStart + i * yStep - 0.5;
      const yVal = yValueStart - i * yValueStep;

      ctx.beginPath();      
      ctx.moveTo(xStart, yPos );
      ctx.lineTo(xEnd, yPos);
      ctx.stroke();

      ctx.fillText(yTicksDisplayFunc(yVal, i), 40, yPos);
    }

  }
}