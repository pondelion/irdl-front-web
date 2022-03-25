import React from 'react'
import { GlobalContext } from '../contexts/Contexts';


interface Props {};

const DashBoard: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);
  return (
    <div>
      dashboard
      <div>hello {gContextValue.signedInUserName} : {gContextValue.accessToken}</div>
      <button onClick={() => {gContextValue.signOut()}}>sign out </button>
    </div>
  )
};

export default DashBoard;
