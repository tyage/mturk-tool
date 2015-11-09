import Config from './config';
import crypto from 'crypto';
import parseXML from './parse-xml';

let generateHmac = (data, key) => {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
};

class MTurk {
  request(params) {
    params = Object.assign({
      Service: 'AWSMechanicalTurkRequester',
      AWSAccessKeyId: Config.get('awsAccessKeyId'),
      Version: '2014-08-15',
      Timestamp: (new Date()).toISOString()
    }, params);
    params.Signature = generateHmac(`${params.Service}${params.Operation}${params.Timestamp}`,
      Config.get('awsSecretAccessKey'));
    let param = Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&');

    return fetch(`${Config.get('apiEndpoint')}/?${param}`, {})
      .then(res => res.text())
      .then(text => parseXML(text));
  }

  createHIT(params) {
    return this.request(Object.assign({
      Operation: 'CreateHIT'
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
      PageSize: 100, // XXX: this is sample,
      PageNumber: 1 // XXX: this is sample
    }, params));
  }

  getAllAssignmentsForHIT(hitId, params = {}) {
    // TODO: get truely all assignments
    return this.getAssignmentsForHIT(hitId);
  }

  waitHIT(hitId, waitSecound = 30 * 1000) {
    let isHITDone = (hit, assignments) => {
      let status = hit.querySelector('HITStatus').textContent;
      let maxAssignments = +hit.querySelector('MaxAssignments').textContent;
      let assignmentsLength = assignments.querySelectorAll('Assignment').length;
      return status === 'Reviewable' && maxAssignments === assignmentsLength;
    };
    let waitHIT = (resolve, reject) => {
      Promise.all([
        this.getHIT(hitId),
        this.getAllAssignmentsForHIT(hitId)
      ]).then(([hit, assignments]) => {
        if (isHITDone(hit, assignments)) {
          // only one param can be passed to resolve
          resolve({ hit, assignments });
        } else {
          window.setTimeout(() => waitHIT(resolve), waitSecound);
        }
      }).catch(() => {
        reject();
      });
    };

    return new Promise((resolve, reject) => {
      waitHIT(resolve, reject);
    });
  }

  getAssignment(assignmentId) {
    // TODO
  }
};

export default (new MTurk());
