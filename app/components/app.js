import React from 'react';
import Config from './config';
import NewHITForm from './new-hit-form';
import MTurk from '../services/mturk';

class App extends React.Component {
  onHITCreate(hitId) {
    MTurk.waitHIT(hitId).then(hit => {
      console.log(hit)
    });
  }
  render() {
    return (
      <div>
        <Config></Config>
        <NewHITForm onHITCreate={this.onHITCreate}></NewHITForm>
      </div>
    );
  }
}

React.render(<App />, document.querySelector('#app'));
