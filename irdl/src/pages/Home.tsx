import React from 'react'
import { GlobalContext } from '../contexts/Contexts';


interface Props {};

const Home: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);
  return (
    <div>hello {gContextValue.signedInUserName} : {gContextValue.accessToken}</div>
  )
};

export default Home;
