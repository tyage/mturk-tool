import React from 'react';
import Config from './config';
import NewHITForm from './new-hit-form';
import MTurk from '../services/mturk';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
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
