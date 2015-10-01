import React from 'react';

export default class HITHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let createHITList = hits => {
      return hits.map(hit => {
        let url = `https://workersandbox.mturkcontent.com/dynamic/hit?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=${hit}`;
        return (<p><a href={url}>{url}</a></p>);
      });
    };

    return (
      <div>
        {createHITList(this.props.hits)}
      </div>
    );
  }
}
