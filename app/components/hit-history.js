import React from 'react';
import parseXML from '../libs/parse-xml';
import Config from '../services/config';

export default class HITHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let createAssignments = assignments => {
      if (assignments === undefined) {
        return;
      }

      let answers = parseXML(assignments.querySelector('Answer').textContent);
      return Array.from(answers.querySelectorAll('Answer')).map(a => {
        let id = a.querySelector('QuestionIdentifier').textContent;
        let text = a.querySelector('FreeText').textContent;
        return (
          <p>{id}: {text}</p>
        );
      });
    };

    let createHITList = (hits, assignmentsList) => {
      let workerEndpoint = Config.get('workerEndpoint');
      let workerContentEndpoint = Config.get('workerContentEndpoint');
      return Object.keys(hits).map(hitId => {
        let hit = hits[hitId];
        let groupId = hit.querySelector('HITGroupId').textContent;
        let hitUrl = `${workerContentEndpoint}/dynamic/hit?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=${hitId}`;
        let previewUrl = `${workerEndpoint}/mturk/preview?groupId=${groupId}`
        let assignments = assignmentsList[hitId];

        return (
          <div className="hit-history">
            <p><a href={hitUrl}>{hitUrl}</a></p>
            <p><a href={previewUrl}>{previewUrl}</a></p>
            <div className="assignments">
              {createAssignments(assignments)}
            </div>
          </div>
        );
      });
    };

    return (
      <div>
        {createHITList(this.props.hits, this.props.assignmentsList)}
      </div>
    );
  }
}
