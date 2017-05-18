import React from 'react';

export default class App extends React.Component {

  onLogButtonClick(event){
    console.log("yay");
  }

  onTicketDataButtonClick(event){
    client.get("ticket").then(function(result){
      console.log(result.ticket);
    });
  }

  render() {
    client.invoke('resize', { width: '100%', height: '300px' });
    return (
      <div>
        <h3>This is using react.js</h3>
        <br/>
        <p className='note'>The data for this is stored in app.jsx in the /src/components/app.jsx folder</p>
        <button onClick={this.onLogButtonClick}>A Button!</button>
        <p> The button above just logs a simple message to the console </p>
        <br/>
        <button onClick={this.onTicketDataButtonClick}>Log Ticket Data</button>
      </div>
    )
  }
}
