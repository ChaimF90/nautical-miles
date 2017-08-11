import * as React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}

export default App;
