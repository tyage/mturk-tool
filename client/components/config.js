import React from 'react';
import ConfigService from '../services/config';

export default class Config extends React.Component {
  constructor(props) {
    super(props);
  }
  onAccessKeyIdChange(e) {
    ConfigService.set('awsAccessKeyId', e.target.value);
  }
  onSecretAccessKeyChange(e) {
    ConfigService.set('awsSecretAccessKey', e.target.value);
  }
  onAPIEndpointChange(e) {
    ConfigService.set('apiEndpoint', e.target.value);
  }
  render() {
    return (
      <div id="config">
        <div className="form-section">
          <label>AWS Access Key ID</label>
          <input type="text" id="config-aws-access-key-id" placeholder="AWS Access Key ID"
          onChange={this.onAccessKeyIdChange.bind(this)}
          defaultValue={ConfigService.get('awsAccessKeyId')} />
        </div>
        <div className="form-section">
          <label>AWS Secret Access Key</label>
          <input type="text" id="config-aws-secret-access-key" placeholder="AWS Secret Access Key"
            onChange={this.onSecretAccessKeyChange.bind(this)} defaultValue={ConfigService.get('awsSecretAccessKey')} />
        </div>
        <div className="form-section">
          <label>Endpoint</label>
          <input type="text" id="config-api-endpoint" placeholder="Amazon Mechanical Turk API Endpoint"
            onChange={this.onAPIEndpointChange.bind(this)}
            defaultValue={ConfigService.get('apiEndpoint')} />
        </div>
      </div>
    );
  }
}
