import React, {useEffect} from 'react';
import './App.scss';
import "@fontsource/roboto";
import {OverviewPage} from "./pages/OverviewPage";

const App = () => {
    useEffect(() => {
        document.title = 'Eten - Benkhard.com';
    }, []);

  return (
    <div className="App">
      <OverviewPage />
    </div>
  );
}

export default App;
