import Config from './config';
import Question from './question';
import crypto from 'crypto';
import parseXML from '../libs/parse-xml';

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
      .then(text => parseXML(text));
  }

  createHIT(template, questions, params = {}) {
    return this.request(Object.assign({
      Operation: 'CreateHIT',
      Question: Question.createQuestion(template, questions),
      MaxAssignments: 1,
      Title: 'sample HIT ' + new Date(), // TODO: this is sample
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

  getAssignmentsForHIT(hitId, params = {}) {
    return this.request(Object.assign({
      Operation: 'GetAssignmentsForHIT',
      HITId: hitId,
      PageSize: 100, // TODO: this is sample,
      PageNumber: 1 // TODO: this is sample
    }, params));
  }

  getAllAssignmentsForHIT(hitId, params = {}) {
    return this.getAssignmentsForHIT(hitId); // TODO: get truely all assignments
  }

  waitHIT(hitId) {
    let waitSecound = 60 * 1000;
    let isHITDone = (hit, assignments) => {
      let status = hit.querySelector('HITStatus').textContent;
      let maxAssignments = +hit.querySelector('MaxAssignments').textContent;
      let assignmentsLength = assignments.querySelectorAll('Assignment').length;
      return status === 'Reviewable' && maxAssignments === assignmentsLength;
    };
    let waitHIT = resolve => {
      Promise.all([
        this.getHIT(hitId),
        this.getAllAssignmentsForHIT(hitId)
      ]).then(values => {
        let [hit, assignments] = values;
        if (isHITDone(hit, assignments)) {
          resolve(hit, assignments);
        } else {
          window.setTimeout(() => waitHIT(resolve), waitSecound);
        }
      });
    };

    return new Promise((resolve, reject) => {
      waitHIT(resolve);
    });
  }

  parseXML(xml) {
    return parseXML(xml);
  }
};

export default (new MTurk());
