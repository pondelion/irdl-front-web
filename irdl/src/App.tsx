import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import axios from 'axios';
//@ts-ignore
import { Service } from 'axios-middleware';
import { GlobalContext } from './contexts/Contexts';
import { darkBlueTheme, mediumBlueRedTheme, navyWhiteTheme } from './themes/MaterialUI';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import LocationView from './pages/LocationView';
import SensorView from './pages/SensorView';
import { userPool } from './aws/Cognito';
import { ThemeProvider } from '@mui/material';
import RemoteCommand from './pages/RemoteCommand';
import Amplify from 'aws-amplify';
import awsConfiguration from './aws/Config';
import { AWSIoTProvider } from '@aws-amplify/pubsub';


Amplify.configure({
  Auth: {
      identityPoolId: awsConfiguration.IDENTITY_POOL_ID, 
      region: awsConfiguration.REGION,
      userPoolId: awsConfiguration.USER_POOL_ID, 
      userPoolWebClientId: awsConfiguration.CLIENT_ID, 
  }
});

Amplify.addPluggable(new AWSIoTProvider({
aws_pubsub_region: awsConfiguration.REGION,
aws_pubsub_endpoint: `wss://${awsConfiguration.IOT_ENDPOINT}/mqtt`,
clientId: awsConfiguration.IOT_THING_NAME
}))


function App() {
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  const [signedInUserName, setSignedInUserName] = React.useState<string>();
  const [accessToken, setAccessToken] = React.useState<string>();
  const axiosService = new Service(axios);
  console.log(isSignedIn);
  console.log(signedInUserName);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {  // Already signed in.
      setIsSignedIn(true);
      setSignedInUserName(cognitoUser.getUsername());
      // setAccessToken(cognitoUser.getSignInUserSession()!.getAccessToken().getJwtToken());
      cognitoUser.getSession((err: any, session: any) => {
        if (session.isValid()) {
          setAccessToken(session.idToken.jwtToken);
          axiosService.register({
            onRequest(config: any) {
              config.headers['Authorization'] = `Bearer ${session.idToken.jwtToken}`;
              return config;
            }
          });
        } else {
          setIsSignedIn(false);
          setSignedInUserName("");
          setAccessToken("");
          console.log('invalid session');
        }
      });
      console.log('signed in');
    } else {
      setIsSignedIn(false);
      setSignedInUserName("");
      setAccessToken("");
      console.log('not signed in');
    }
  }, [isSignedIn, signedInUserName, accessToken]);

  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.clear();
      console.log('signed out');
      setIsSignedIn(false);
      setSignedInUserName("");
      setAccessToken("");
    } else {
      localStorage.clear();
      console.log('no user signed in');
    }
  };

  return (
    <GlobalContext.Provider value={{
      isSignedIn: isSignedIn,
      signedInUserName: signedInUserName,
      accessToken: accessToken,
      setIsSignedIn: setIsSignedIn,
      setSignedInUserName: setSignedInUserName,
      setAccessToken: setAccessToken,
      signOut: signOut,
    }}>
      <ThemeProvider theme={navyWhiteTheme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes >
            <Route path="/" element={isSignedIn ? <Home />: <Navigate to="/signin" replace />} />
          </Routes >
          <Routes >
            <Route path="/signin" element={isSignedIn ? <Navigate to="/" replace /> : <SignIn />} />
          </Routes >
          <Routes >
            <Route path="/dashboard" element={isSignedIn ? <DashBoard />: <Navigate to="/signin" replace />} />
          </Routes >
          <Routes >
            <Route path="/location" element={isSignedIn ? <LocationView />: <Navigate to="/signin" replace />} />
          </Routes >
          <Routes >
            <Route path="/sensor" element={isSignedIn ? <SensorView />: <Navigate to="/signin" replace />} />
          </Routes >
          <Routes >
            <Route path="/remote_control" element={isSignedIn ? <RemoteCommand />: <Navigate to="/signin" replace />} />
          </Routes >
        </Router>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

export default App;
