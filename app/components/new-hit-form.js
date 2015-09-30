import React from 'react';
import MTurk from '../services/mturk';

let sampleQuestions = [
  {
    id: 1,
    choiceHTML: `
<img alt="" src="https://c1.staticflickr.com/9/8594/16054902599_6966b2db21_h.jpg" />
`,
    contentHTML: `
<img alt="" src="https://c1.staticflickr.com/9/8594/16054902599_6966b2db21_h.jpg" />
<img alt="" src="https://c1.staticflickr.com/9/8569/16646420366_6e0a53ac28_b.jpg" />
`
  },
  {
    id: 2,
    choiceHTML: `
<img alt="" src="https://c1.staticflickr.com/7/6130/6031622173_0717f60364_b.jpg" />
`,
    contentHTML: `
<img alt="" src="https://c1.staticflickr.com/7/6130/6031622173_0717f60364_b.jpg" />
<img alt="" src="https://c2.staticflickr.com/8/7591/16927383470_fae1e64a36_b.jpg" />
`
  },
  {
    id: 3,
    choiceHTML: `
<img alt="" src="https://c2.staticflickr.com/6/5224/13958381985_3a99313e37_b.jpg" />
`,
    contentHTML: `
<img alt="" src="https://c2.staticflickr.com/6/5224/13958381985_3a99313e37_b.jpg" />
`
  },
  {
    id: 4,
    choiceHTML: `
<img alt="" src="https://c2.staticflickr.com/4/3759/13246576093_924da6c4c8_b.jpg" />
`,
    contentHTML: `
<img alt="" src="https://c2.staticflickr.com/4/3759/13246576093_924da6c4c8_b.jpg" />
<img alt="" src="https://c1.staticflickr.com/7/6031/6318915136_8b986accdd_b.jpg" />
`
  }
];

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
        <div>
          <label>New HIT Template</label>
          <textarea onChange={this.hitTemplateChange.bind(this)}></textarea>
        </div>
        <div>
          <input type="submit" value="Create New HIT" onClick={this.onSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}
