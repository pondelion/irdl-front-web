import * as React from 'react';
import Plot from 'react-plotly.js';
 

interface Props {}

export const Heatmap: React.FC<Props> = (props: Props) => {
  return (
    <Plot
    data={[
      {
        z: [...Array(10)].map(x => {return [...Array(10)].map(x => {return  Math.random()})}),
        type: 'heatmap'
      },
    ]}
    layout={{width: 500, height: 500, title: 'Heatmap', paper_bgcolor:"#FFF3"}}
  />
  );
}

export default Heatmap;
