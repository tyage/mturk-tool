import React from 'react';
import Config from './config';

class App extends React.Component {
  render() {
    return (
      <div>
        <Config></Config>
      </div>
    );
  }
}

React.render(<App />, document.querySelector('#app'));
