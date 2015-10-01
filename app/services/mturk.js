import Config from './config';
import Question from './question';
import crypto from 'crypto';

let generateHmac = (data, key) => {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
};

// XXX: sandbox
let endpoint = 'https://mechanicalturk.sandbox.amazonaws.com';

class MTurk {
  request(params) {
    params = Object.assign({
      Service: 'AWSMechanicalTurkRequester',
      AWSAccessKeyId: Config.get('AWSAccessKeyId'),
      Version: '2014-08-15',
      Timestamp: (new Date()).toISOString()
    }, params);
    params.Signature = generateHmac(`${params.Service}${params.Operation}${params.Timestamp}`,
      Config.get('AWSSecretAccessKey'));
    let param = Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&');

    return fetch(`${endpoint}/?${param}`, {})
      .then(res => res.text())
      .then(text => (new DOMParser()).parseFromString(text, 'text/xml'));
  }

  createHIT(template, questions, params = {}) {
    return this.request(Object.assign({
      Operation: 'CreateHIT',
      Question: Question.createQuestion(template, questions),
      MaxAssignments: 1,
      Title: 'sample HIT', // TODO: this is sample
      Description: 'sample desc', // TODO: this is sample
      AssignmentDurationInSeconds: 30, // TODO: this is sample
      LifetimeInSeconds: 604800, // TODO: this is sample
      'Reward.1.Amount': 0.32, // TODO: this is sample
      'Reward.1.CurrencyCode': 'USD' // TODO: this is sample
    }), params);
  }

  getHIT(hitId, params = {}) {
    return this.request(Object.assign({
      Operation: 'GetHIT',
      HITId: hitId
    }, params));
  }

  waitHIT(hitId) {

  }
};

export default (new MTurk());
