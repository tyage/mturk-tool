import Config from './config';
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

    return fetch(`${endpoint}/?${param}`, {});
  }

  createHIT(template, params = {}) {
    return this.request(Object.assign({
      Operation: 'CreateHIT',
      Title: 'testtes',
      Description: 'testtes',
      AssignmentDurationInSeconds: 30,
      LifetimeInSeconds: 604800,
			Question: `
<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
  <HTMLContent><![CDATA[
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
  </head>
  <body>
    <form name='mturk_form' method='post' id='mturk_form' action='https://www.mturk.com/mturk/externalSubmit'>
      <input type='hidden' value='' name='assignmentId' id='assignmentId'/>
      <h1>What's up?</h1>
      <p><textarea name='comment' cols='80' rows='3'></textarea></p>
      <p><input type='submit' id='submitButton' value='Submit' /></p>
    </form>
    ${template}
  </body>
</html>
  ]]></HTMLContent>
  <FrameHeight>450</FrameHeight>
</HTMLQuestion>`,
      'Reward.1.Amount': 0.32,
      'Reward.1.CurrencyCode': 'USD',
			MaxAssignments: 1,
    }), params);
  }
};

export default (new MTurk());
