import React from 'react';
import parseXML from '../libs/parse-xml';

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
      return Object.keys(hits).map(hitId => {
        let hit = hits[hitId];
        let assignments = assignmentsList[hitId];
        let url = `https://workersandbox.mturkcontent.com/dynamic/hit?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=${hitId}`;

        return (
          <div className="hit-history">
            <div>
              <a href={url}>{url}</a>
            </div>
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
