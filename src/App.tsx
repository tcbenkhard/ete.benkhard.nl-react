import React, {useCallback} from 'react';
import './App.scss';
import "@fontsource/roboto";
import {OverviewPage} from "./pages/OverviewPage";

const App = () => {
  return (
    <div className="App">
      <OverviewPage />
    </div>
  );
}

export default App;
