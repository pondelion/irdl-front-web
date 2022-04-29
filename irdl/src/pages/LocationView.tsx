import { Container, Grid, Paper } from '@mui/material';
import React from 'react'
import { GlobalContext } from '../contexts/Contexts';
import Header from '../layouts/Header';
import SideMenu from '../layouts/SideMenu';
import Map, { PolylineData } from '../components/widgets/Map'


interface Props {};

const LocationView: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);
  const dummyLocations: number[][][] = [
    [
      [51.5, -0.1],
      [51.5, -0.12],
      [51.52, -0.12],
    ],
    [
      [51.5, -0.05],
      [51.5, -0.06],
      [51.52, -0.06],
    ],
  ]
  return (
    <div>
      <Header />
      <SideMenu />
      location view
      <div>hello {gContextValue.signedInUserName} : {gContextValue.accessToken}</div>
      <Container
        maxWidth='lg'
        style={{margin: "0vh 0px 0px 10vw", padding: "0px 0px 0px 0px", minHeight: '100vh'}}
      >
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={10} md={10} lg={10}>
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 5px 0px 0px", height: 500, maxHeight: '100vh', overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              <Map
                center={[51.505, -0.09]}
                polylineData={[
                  {positions: dummyLocations[0]} as PolylineData,
                  {positions: dummyLocations[1], pathOptions: {color: "green"}} as PolylineData,
                ]}
                markerData={[
                  {position: [51.505, -0.09], popupText: "Center"}
                ]}
                circleData={[
                  {center: [51.509, -0.05], radius: 50, pathOptions: {color: "#0000FF"}}
                ]}
                circleMarkerData={[
                  {center: [51.500, -0.13], radius: 10, pathOptions: {color: "#DD00FF"}, popupText: "Circle Marker"}
                ]}
                polygonData={[
                  {positions: dummyLocations[1], pathOptions: {color: "#00FFFF"}}
                ]}
              />
            </Paper>
          </Grid>
          <Grid item xs={2} md={2} lg={2} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 0px 0px 5px", height: 500}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              b
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "10px 0px 0px 0px", height: 300}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              c
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
};

export default LocationView;
