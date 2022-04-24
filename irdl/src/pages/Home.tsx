import { DateTime } from 'luxon';
import React from 'react'
import DatetimeRangeSlider from '../components/widgets/DatetimeRangeSlider';
import { GlobalContext } from '../contexts/Contexts';
import Header from '../layouts/Header';
import SideMenu from '../layouts/SideMenu';


interface Props {};

const Home: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);
  return (
    <div>
      <Header />
      <SideMenu />
      home
      <div>hello {gContextValue.signedInUserName} : {gContextValue.accessToken}</div>
      <button onClick={() => {gContextValue.signOut()}}>sign out </button>
      <DatetimeRangeSlider
        startDate={DateTime.local().minus({weeks: 2}).toJSDate()}
        endDate={DateTime.local().toJSDate()}
      />
    </div>
  )
};

export default Home;
