import * as React from 'react';
import Plot from 'react-plotly.js';
 

interface Props {}

export const Histogram: React.FC<Props> = (props: Props) => {
  return (
    <Plot
    data={[
      {
        x: [...Array(300)].map(x => {return  Math.random()}),
        y: [...Array(300)].map(x => {return  Math.random()}),
        type: 'histogram',
        marker: {
          color: 'pink',
        },
        autobinx: false, 
        xbins: {
          end: 1, 
          size: 0.05, 
          start: 0
        },
        opacity: 0.8,
      },
    ]}
    layout={{width: 500, height: 500, title: 'Histogram', plot_bgcolor:"#777777", paper_bgcolor:"#FFF3"}}
  />
  );
}
 
export default Histogram;
