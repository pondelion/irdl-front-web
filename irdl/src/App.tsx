import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate  } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { GlobalContext } from './contexts/Contexts';
import { darkBlueTheme, mediumBlueRedTheme } from './themes/MaterialUI';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { userPool } from './aws/Cognito';


function App() {
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  const [signedInUserName, setSignedInUserName] = React.useState<string>();
  const [accessToken, setAccessToken] = React.useState<string>();
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
          setAccessToken(session.accessToken.jwtToken);
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

  return (
    <GlobalContext.Provider value={{
      isSignedIn: isSignedIn,
      signedInUserName: signedInUserName,
      accessToken: accessToken,
      setIsSignedIn: setIsSignedIn,
      setSignedInUserName: setSignedInUserName,
      setAccessToken: setAccessToken,
    }}>
      <MuiThemeProvider theme={mediumBlueRedTheme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes >
            <Route path="/" element={isSignedIn ? <Home />: <Navigate to="/signin" replace />} />
          </Routes >
          <Routes >
            <Route path="/signin" element={isSignedIn ? <Navigate to="/" replace /> : <SignIn />} />
          </Routes >
        </Router>
      </MuiThemeProvider>
    </GlobalContext.Provider>
  );
}

export default App;
