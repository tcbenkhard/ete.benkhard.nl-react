import React, {useEffect, useState} from 'react';
import './App.scss';
import "@fontsource/roboto";
import {OverviewPage} from "./pages/OverviewPage";
import {PicnicClient} from "./client/PicnicClient";

const picnicBaseUrl = 'https://4daaczxlw3.execute-api.eu-west-1.amazonaws.com/prod/picnic/15'

export const PicnicClientContext = React.createContext<PicnicClient>(new PicnicClient({
    baseUrl: picnicBaseUrl
}));

const App = () => {
    const [picnicClient, setPicnicClient] = useState<PicnicClient>(new PicnicClient({
        baseUrl: picnicBaseUrl
    }));

    useEffect(() => {
        const authToken = window.localStorage.getItem('authToken')
        if(authToken){
            setPicnicClient(new PicnicClient({
                baseUrl: picnicBaseUrl,
                authToken: authToken
            }))
        }
    }, []);


    useEffect(() => {
        const authToken = window.localStorage.getItem('picnic-auth-token')
        if(authToken) {
            setPicnicClient(new PicnicClient({
                baseUrl: picnicBaseUrl,
                authToken: authToken || undefined
            }))
        }
    }, []);


    useEffect(() => {
        document.title = 'Eten - Benkhard.com';

    }, []);

  return (
    <div className="App">
        <PicnicClientContext.Provider value={picnicClient}>
            <OverviewPage />
        </PicnicClientContext.Provider>
    </div>
  );
}

export default App;
