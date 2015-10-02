import React from 'react';
import ConfigService from '../services/config';

export default class Config extends React.Component {
  constructor(props) {
    super(props);
  }
  onAccessKeyIdChange(e) {
    ConfigService.set('AWSAccessKeyId', e.target.value);
  }
  onSecretAccessKeyChange(e) {
    ConfigService.set('AWSSecretAccessKey', e.target.value);
  }
  onEndpointChange(e) {
    ConfigService.set('endpoint', e.target.value);
  }
  render() {
    return (
      <div id="config">
        <div className="form-section">
          <label>AWS Access Key ID</label>
          <input type="text" id="config-aws-access-key-id" placeholder="AWS Access Key ID"
          onChange={this.onAccessKeyIdChange.bind(this)}
          defaultValue={ConfigService.get('AWSAccessKeyId')} />
        </div>
        <div className="form-section">
          <label>AWS Secret Access Key</label>
          <input type="text" id="config-aws-secret-access-key" placeholder="AWS Secret Access Key"
            onChange={this.onSecretAccessKeyChange.bind(this)} defaultValue={ConfigService.get('AWSSecretAccessKey')} />
        </div>
        <div className="form-section">
          <label>Endpoint</label>
          <input type="text" id="config-endpoint" placeholder="Amazon Mechanical Turk Endpoint"
            onChange={this.onEndpointChange.bind(this)}
            defaultValue={ConfigService.get('endpoint')} />
        </div>
      </div>
    );
  }
}
