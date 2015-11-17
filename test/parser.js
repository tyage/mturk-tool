import { loadXML, parseHIT, parseAssignment } from '../lib/parser';
import assert from 'assert';

let sampleHIT = `
<HIT>
  <HITId>123RVWYBAZW00EXAMPLE</HITId>
  <HITTypeId>T100CN9P324W00EXAMPLE</HITTypeId>
  <CreationTime>2005-06-30T23:59:59</CreationTime>
  <HITStatus>Assignable</HITStatus>
  <MaxAssignments>5</MaxAssignments>
  <AutoApprovalDelayInSeconds>86400</AutoApprovalDelayInSeconds>
  <LifetimeInSeconds>86400</LifetimeInSeconds>
  <AssignmentDurationInSeconds>300</AssignmentDurationInSeconds>
  <Reward>
    <Amount>25</Amount>
    <CurrencyCode>USD</CurrencyCode>
    <FormattedPrice>$0.25</FormattedPrice>
  </Reward>
  <Title>Location and Photograph Identification</Title>
  <Description>Select the image that best represents...</Description>
  <Keywords>location, photograph, image, identification, opinion</Keywords>
  <Question>
    &lt;QuestionForm&gt;
      [XML-encoded Question data]
    &lt;/QuestionForm&gt;
  </Question>
  <QualificationRequirement>
    <QualificationTypeId>789RVWYBAZW00EXAMPLE</QualificationTypeId>
    <Comparator>GreaterThan</Comparator>
    <Value>18</Value>
  </QualificationRequirement>
  <HITReviewStatus>NotReviewed</HITReviewStatus>
</HIT>
`;
let sampleHITId = '123RVWYBAZW00EXAMPLE';
let sampleHITRewardAmount = '25';

let sampleCreateHITResponse = `
<?xml version="1.0"?>
<CreateHITResponse><OperationRequest><RequestId>4883bcd2-0073-4512-8bcf-ae5d809110c5</RequestId></OperationRequest><HIT><Request><IsValid>True</IsValid></Request><HITId>123RVWYBAZW00EXAMPLE</HITId><HITTypeId>T100CN9P324W00EXAMPLE</HITTypeId></HIT></CreateHITResponse>
`;

describe('parser', () => {
  describe('parseHIT', () => {
    it('should get HITId', () => {
      assert.equal(parseHIT(loadXML(sampleHIT)).HITId, sampleHITId);
    });
    it('should get Reward.Amount', () => {
      assert.equal(parseHIT(loadXML(sampleHIT)).Reward.Amount, sampleHITRewardAmount);
    });
    it('should get HITId of CreateHITResponse', () => {
      assert.equal(parseHIT(loadXML(sampleCreateHITResponse)).HITId, sampleHITId);
    });
  });
});
