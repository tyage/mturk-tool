import React from 'react';
import MTurk from '../services/mturk';
import fs from 'fs';

import sampleQuestions from '../resources/sample-questions';
let sampleTemplate = fs.readFileSync(__dirname + '/../resources/sample-template.html');

export default class NewHITForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hitTemplate: null
    };
  }
  onSubmit() {
    MTurk.createHIT(this.state.hitTemplate, sampleQuestions);
  }
  hitTemplateChange(e) {
    this.setState({
      hitTemplate: e.target.value
    });
  }
  render() {
    return (
      <div id="new-hit-form">
        <h2>Create New HIT</h2>
        <div className="form-section">
          <label>New HIT Template</label>
          <textarea id="new-hit-template" onChange={this.hitTemplateChange.bind(this)} defaultValue={sampleTemplate}></textarea>
        </div>
        <div className="form-section">
          <label></label>
          <input type="submit" value="Create New HIT" onClick={this.onSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}
