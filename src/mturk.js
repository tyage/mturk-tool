import Config from './config';
import crypto from 'crypto';
import parseXML from './parse-xml';
import fetch from 'node-fetch';

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
    }, params));
  }

  getHIT(hitId, params = {}) {
    return this.request(Object.assign({
      Operation: 'GetHIT',
      HITId: hitId
    }, params));
  }

  getAssignment(assignmentId, params = {}) {
    return this.request(Object.assign({
      Operation: 'GetAssignment',
      AssignmentId: AssignmentId
    }, params));
  }

  generateQuestionXML(content, frameHeight = 450) {
    return `
<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
  <HTMLContent><![CDATA[ ${content} ]]></HTMLContent>
  <FrameHeight>${frameHeight}</FrameHeight>
</HTMLQuestion>
`
  }
};

export default (new MTurk());
