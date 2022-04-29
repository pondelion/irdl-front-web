import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, CircleMarker, Circle, Polyline, Polygon, Rectangle } from 'react-leaflet'
import Leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";

/* eslint-disable */
delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
/* eslint-disable */

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const redOptions = { color: 'red' }

export type PolylineData = {
  positions: number[][],
  pathOptions?: any,
}
export type MultiPolylineData = PolylineData[];

type MarkerData = {
  position: number[],
  popupText?: string
}
export type MultiMarkerData = MarkerData[];

type CircleData = {
  center: number[],
  pathOptions?: any,
  radius?: number,
}
export type MultiCircleData = CircleData[];

type CircleMarkerData = CircleData & {
  popupText?: string
}
export type MultiCircleMarkerData = CircleMarkerData[];

export type PolygonData = {
  positions: number[][],
  pathOptions?: any,
}
export type MultiPolygonData = PolygonData[];

export type RectangleData = {
  bounds: number[][],
  pathOptions?: any,
}
export type MultiRectangleData = RectangleData[];

interface Props {
  center: number[],
  zoom?: number,
  width?: number | string,
  height?: number | string,
  polylineData?: MultiPolylineData,
  markerData?: MultiMarkerData,
  circleData?: MultiCircleData,
  circleMarkerData?: MultiCircleMarkerData,
  polygonData?: MultiPolygonData,
  rectangleData?: MultiRectangleData,
}

const Map: React.FC<Props> = (props: Props) => {
  const [idx, setIdx] = useState<number>(0);
  return (
    <div>
    <MapContainer
      center={props.center as any}
      zoom={props.zoom ? props.zoom : 13}
      scrollWheelZoom={true}
      style={{ height: props.height ? props.height : "50vh", width:  props.width ? props.width : "80%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        props.markerData ?
           props.markerData.map((md) => {
            return (
              <Marker
                position={md.position as any}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup(),
                  mouseout: (event) => event.target.closePopup(),
                }}
              >
                {
                  md.popupText ?
                    <Popup>
                      {md.popupText}
                    </Popup>
                    :
                    ""
                }
              </Marker>
            )
          })
          :
          ""
      }
      {
        props.circleData ?
           props.circleData.map((cd) => {
            return (
              <Circle
                center={cd.center as any}
                pathOptions={cd.pathOptions ? cd.pathOptions : redOptions}
                radius={cd.radius ? cd.radius : 200} />
            )
          })
          :
          ""
      }
      {
        props.circleMarkerData ?
           props.circleMarkerData.map((cd) => {
            return (
              <CircleMarker
                center={cd.center as any}
                pathOptions={cd.pathOptions ? cd.pathOptions : redOptions}
                radius={cd.radius ? cd.radius : 200}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup(),
                  mouseout: (event) => event.target.closePopup(),
                }}
              >
                {
                  cd.popupText ?
                    <Popup>
                      {cd.popupText}
                    </Popup>
                    :
                    ""
                }
              </CircleMarker>
            )
          })
          :
          ""
      }
      {
        props.polylineData ?
           props.polylineData.map((pd) => {
            return (
              <Polyline
                pathOptions={pd.pathOptions ? pd.pathOptions : redOptions}
                positions={pd.positions as any}
              />
            )
          })
          :
          ""
      }
      {
        props.polygonData ?
           props.polygonData.map((pd) => {
            return (
              <Polygon
                pathOptions={pd.pathOptions ? pd.pathOptions : redOptions}
                positions={pd.positions as any}
              />
            )
          })
          :
          ""
      }
      {
        props.rectangleData ?
           props.rectangleData.map((rd) => {
            return (
              <Rectangle
                pathOptions={rd.pathOptions ? rd.pathOptions : redOptions}
                bounds={rd.bounds as any}
              />
            )
          })
          :
          ""
      }
    </MapContainer>
    </div>
  );
};

export default Map;
