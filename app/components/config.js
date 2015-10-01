import React from 'react';
import ConfigService from '../services/config';

// TODO: Set keys to localstorage
export default class Config extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AWSAccessKeyId: ConfigService.get('AWSAccessKeyId'),
      AWSSecretAccessKey: ConfigService.get('AWSSecretAccessKey')
    };
  }
  onAccessKeyIdChange(e) {
    ConfigService.set('AWSAccessKeyId', e.target.value);
  }
  onSecretAccessKeyChange(e) {
    ConfigService.set('AWSSecretAccessKey', e.target.value);
  }
  render() {
    return (
      <div id="config">
        <label>
          <span>AWS Access Key ID:&nbsp;</span>
          <input type="text" id="config-aws-access-key-id" placeholder="AWS Access Key ID"
          onChange={this.onAccessKeyIdChange.bind(this)} value={this.state.AWSAccessKeyId} />
        </label>
        <br />
        <label>
          <span>AWS Secret Access Key:&nbsp;</span>
          <input type="text" id="config-aws-secret-access-key" placeholder="AWS Secret Access Key"
            onChange={this.onSecretAccessKeyChange.bind(this)} value={this.state.AWSSecretAccessKey} />
        </label>
      </div>
    );
  }
}
