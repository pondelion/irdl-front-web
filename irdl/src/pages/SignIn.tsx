import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import '../App.css';
import { userPool } from '../aws/Cognito';
import { GlobalContext } from '../contexts/Contexts';


interface Props {};

const SignIn: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);
  const [username, setUserName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [errMsg, setErrMsg] = React.useState<string>('')
  const changedUserNameHaldler = (e: any) => setUserName(e.target.value)
  const changedPasswordHandler = (e: any) => setPassword(e.target.value)

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username : username,
      Password : password
    })
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        // login success
        console.log('result: ' + result)
        const accessToken = result.getAccessToken().getJwtToken()
        console.log('AccessToken: ' + accessToken)
        setErrMsg('');
        gContextValue.setIsSignedIn(true);
        gContextValue.setSignedInUserName(username);
        gContextValue.setAccessToken(accessToken);
      },
      onFailure: (err: any) => {
        console.error(err);
        setErrMsg(err.message);
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{padding: "10px 50px 30px", marginTop: 50, backgroundColor: '#EEEEEE'}}>
        <Grid container justify="center">
          <h1>
            Sign In
          </h1>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="User Name"
            onChange={changedUserNameHaldler}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="Password"
            onChange={changedPasswordHandler}
          />
          <div style={{marginTop: 20}}>
            <Button variant="contained" color="primary" onClick={signIn}>Sign In</Button>
          </div>
          <div style={{color:'red', fontWeight:'bold', marginTop: 20, fontSize: 14}}>{errMsg}</div>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignIn;