import React from 'react';

class App extends React.Component {
  render() {
    return <div>This is React component</div>
  }
}

React.render(<App />, document.querySelector('#app'));
