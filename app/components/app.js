import React from 'react';
import Config from './config';
import NewHITForm from './new-hit-form';

class App extends React.Component {
  render() {
    return (
      <div>
        <Config></Config>
        <NewHITForm></NewHITForm>
      </div>
    );
  }
}

React.render(<App />, document.querySelector('#app'));
