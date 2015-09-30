import Config from './config';
import crypto from 'crypto';

let generateHmac = (data, key) => {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
};

// XXX: sandbox
let endpoint = 'https://mechanicalturk.sandbox.amazonaws.com';

class MTurk {
  request(operation) {
    let params = {
      Service: 'AWSMechanicalTurkRequester',
      AWSAccessKeyId: Config.get('AWSAccessKeyId'),
      Version: '2014-08-15',
      Operation: operation,
      Timestamp: (new Date()).toISOString(),
      HITTypeId: '',
      Question: '',
      LifetimeInSeconds: 604800
    };
    params.Signature = generateHmac(`${params.Service}${params.Operation}${params.Timestamp}`,
      Config.get('AWSSecretAccessKey'));
    let param = Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&');

    return fetch(`${endpoint}/?${param}`, {});
  }
  createHIT(hitTemplate, hitData) {
    return this.request('CreateHIT');
  }
};

export default (new MTurk());
