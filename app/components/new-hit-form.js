import React from 'react';
import MTurk from '../services/mturk';
import parseXML from '../libs/parse-xml';
import HITHistory from './hit-history';
import fs from 'fs';

import sampleQuestions from '../resources/sample-questions';
let sampleTemplate = fs.readFileSync(__dirname + '/../resources/sample-template.html');

export default class NewHITForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hitTemplate: sampleTemplate,
      hitQuestions: sampleQuestions,
      hitHistory: {},
      assignmentsHistory: {},
      isCreatingHIT: false,
      isWaitingForHIT: false
    };
  }

  // 1. wait until current HIT is done
  // 2. when current HIT is done, remove selected question from question choices
  // 3a. if choices are empty, end process
  // 3b. if choices are exists, create new hit with new choices
  waitAndCreateNextHIT(hitId) {
    this.setState({
      isWaitingForHIT: true
    });

    MTurk.waitHIT(hitId).then(([hit, assignments]) => {
      let answer = parseXML(assignments.querySelector('Answer').textContent);
      let selectedQuestion = Array.from(answer.querySelectorAll('Answer')).find(a => {
        return a.querySelector('QuestionIdentifier').textContent === 'selected-question';
      }).querySelector('FreeText').textContent;
      let newHITQuestions = this.state.hitQuestions.filter(q => {
        return q.id.toString() !== selectedQuestion;
      });

      this.state.hitHistory[hitId] = hit;
      this.state.assignmentsHistory[hitId] = assignments;
      this.setState({
        isWaitingForHIT: false,
        hitQuestions: newHITQuestions,
        hitHistory: this.state.hitHistory,
        assignmentsHistory: this.state.assignmentsHistory
      });

      this.createHIT();
    });
  }

  createHIT() {
    if (this.state.hitQuestions.length === 0) {
      return;
    }

    this.setState({
      isCreatingHIT: true
    });

    MTurk.createHIT(this.state.hitTemplate, this.state.hitQuestions).then(doc => {
      this.setState({
        isCreatingHIT: false
      });

      let hitId = doc.querySelector('HITId').textContent;

      this.waitAndCreateNextHIT(hitId);

      return MTurk.getHIT(hitId);
    }).then(hit => {
      let hitId = hit.querySelector('HITId').textContent;
      this.state.hitHistory[hitId] = hit;
      this.setState({
        hitHistory: this.state.hitHistory
      });
    });
  }

  hitTemplateChange(e) {
    this.setState({
      hitTemplate: e.target.value
    });
  }

  render() {
    let formDisabled = this.state.isCreatingHIT || this.state.isWaitingForHIT;

    return (
      <div id="new-hit-form">
        <h2>Create New HIT</h2>
        <div className="form-section">
          <label>New HIT Template</label>
          <textarea id="new-hit-template" onChange={this.hitTemplateChange.bind(this)}
            defaultValue={this.state.hitTemplate} disabled={formDisabled}></textarea>
        </div>
        <div className="form-section">
          <label></label>
          <input type="submit" value="Create New HIT" onClick={this.createHIT.bind(this)}
            disabled={formDisabled} />
        </div>

        <HITHistory hits={this.state.hitHistory} assignments={this.state.assignmentsHistory} />
      </div>
    );
  }
}
