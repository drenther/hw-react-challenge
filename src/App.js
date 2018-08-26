import React, { Component } from 'react';

import Header from './components/Header';
import Aside from './components/Aside';
import Viewer from './components/Viewer';
import Location from './components/Location';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Aside />
          <section>
            <Location />
            <Viewer />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
