import { Container, Grid, Paper } from '@mui/material';
import React from 'react'
import { GlobalContext } from '../contexts/Contexts';
import Header from '../layouts/Header';
import SideMenu from '../layouts/SideMenu';
import ImageGallery, { ImgData } from '../components/widgets/ImageGallery';
import RemoteCommandAPI from '../api_client/RemoteCommandAPI';


interface Props {};

const DashBoard: React.FC<Props> = (props: Props) => {
  const images = [
    {
      original: 'https://cdn.pixabay.com/photo/2020/03/09/23/04/plum-4917370_960_720.jpg',
      thumbnail: 'https://cdn.pixabay.com/photo/2020/03/09/23/04/plum-4917370_960_720.jpg',
    },
    {
      original: 'https://cdn.pixabay.com/photo/2020/02/21/18/43/kosmeen-4868375_960_720.jpg',
      thumbnail: 'https://cdn.pixabay.com/photo/2020/02/21/18/43/kosmeen-4868375_960_720.jpg',
    },
    {
      original: 'https://cdn.pixabay.com/photo/2016/04/16/12/50/chrysanthemum-1332994_960_720.jpg',
      thumbnail: 'https://cdn.pixabay.com/photo/2016/04/16/12/50/chrysanthemum-1332994_960_720.jpg',
    },
  ];
  const gContextValue = React.useContext(GlobalContext);
  const [glrImages, setGlrImages] = React.useState<ImgData[]>(images);
  const authCheck = () => {
    new RemoteCommandAPI().takePicture("android_test_device1")
      .then((res: any) => {
        console.log(res)
        const imgs = glrImages.concat([{
          "original": res.data.image_url,
          "thumbnail": res.data.image_url,
        }])
        setGlrImages(imgs)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Header />
      <SideMenu />
      dashboard
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
              <ImageGallery images={glrImages}/>
            </Paper>
          </Grid>
          <Grid item xs={2} md={2} lg={2} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 0px 0px 5px", height: 500}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              <button onClick={authCheck}>API</button>
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

export default DashBoard;
