import React from 'react';
import ConfigService from '../services/config';

// TODO: Set keys to localstorage
export default class Config extends React.Component {
  onAccessKeyIdChange(e) {
    ConfigService.set('AWSAccessKeyId', e.target.value);
  }
  onSecretAccessKeyChange(e) {
    ConfigService.set('AWSSecretAccessKey', e.target.value);
  }
  render() {
    return (
      <div id="config">
        <input type="text" id="config-aws-access-key-id" placeholder="AWS Access Key ID"
          onChange={this.onAccessKeyIdChange.bind(this)} />
        <input type="text" id="config-aws-secret-access-key" placeholder="AWS Secret Access Key"
          onChange={this.onSecretAccessKeyChange.bind(this)} />
      </div>
    );
  }
}
