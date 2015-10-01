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
        <div className="form-section">
          <label>AWS Access Key ID</label>
          <input type="text" id="config-aws-access-key-id" placeholder="AWS Access Key ID"
          onChange={this.onAccessKeyIdChange.bind(this)} defaultValue={this.state.AWSAccessKeyId} />
        </div>
        <div className="form-section">
          <label>AWS Secret Access Key</label>
          <input type="text" id="config-aws-secret-access-key" placeholder="AWS Secret Access Key"
            onChange={this.onSecretAccessKeyChange.bind(this)} defaultValue={this.state.AWSSecretAccessKey} />
        </div>
      </div>
    );
  }
}
