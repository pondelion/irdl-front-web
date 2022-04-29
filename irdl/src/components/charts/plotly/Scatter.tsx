import * as React from 'react';
import Plot from 'react-plotly.js';
 

interface Common {
  x: number[] | number[][]
  y: number[] | number[][]
  width?: number,
  height?: number,
  title?: string,
  color?: string,
}
interface Props2D extends Common {}
interface Props3D extends Common {
  z: number[] | number[][]
}


export const Scatter2D: React.FC<Props2D> = (props: Props2D) => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},
        },
      ]}
      layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
    />
  );
}
 

export const Scatter3D: React.FC<Props3D> = (props: Props3D) => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [3, 2, 1],
          z: [2, 3, 1],
          type: 'scatter3d',
          mode: 'markers',
          // marker: {color: 'red'},
          name: "data1"
        },
        {
          x: [1, 2, 3],
          y: [2, 3, 1],
          z: [3, 2, 1],
          type: 'scatter3d',
          mode: 'markers',
          // marker: {color: 'red'},
          name: "data2"
        },
      ]}
      layout={{width: 800, height: 600, title: 'Scatter 3D', plot_bgcolor:"black", paper_bgcolor:"#FFF3"}}
    />
  );
}
