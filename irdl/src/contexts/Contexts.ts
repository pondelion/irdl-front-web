import React from 'react';


export type GlobalContextValue = {
  isSignedIn: boolean,
  signedInUserName: string|undefined,
  accessToken: string|undefined,
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setSignedInUserName: React.Dispatch<React.SetStateAction<string|undefined>>,
  setAccessToken: React.Dispatch<React.SetStateAction<string|undefined>>,
  signOut: () => void,
};

export const GlobalContext = React.createContext<GlobalContextValue>(
  {} as GlobalContextValue
);
