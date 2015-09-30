import React from 'react';

// TODO: Set keys to localstorage
export default class Config extends React.Component {
  render() {
    return (
      <div id="config">
        <input type="text" id="config-aws-access-key-id" placeholder="AWS Access Key ID" />
        <input type="text" id="config-aws-secret-access-key" placeholder="AWS Secret Access Key" />
      </div>
    );
  }
}
