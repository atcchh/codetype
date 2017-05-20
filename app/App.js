import React, { Component } from 'react';
import { render } from 'react-dom';
import fs from 'fs';

import Code from 'Code';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '// code sample\n\nvar days = 28;\nvar summ = 100;\n\nconsole.log(days * summ);'
      // code: ''
    };

    this.handleChooseFile = this.handleChooseFile.bind(this);
    this.handleLoadFile = this.handleLoadFile.bind(this);
  }

  handleChooseFile() {
    this.fileInput.click();
  }

  handleLoadFile() {
    const file = this.fileInput.files[0];
    const fileReader = new FileReader();
    
    fileReader.readAsText(file);

    fileReader.onload = () => {
      console.log(fileReader.result);
      // for (let i = 0; i < fileReader.result.length; i++) {
      //   console.log(fileReader.result[i] + ' => ' + fileReader.result[i].charCodeAt(0));
      // }
      this.setState({ code: fileReader.result });
    };
  }

  render() {
    return (
      <div>
        <form style={{textAlign: 'center'}}>
          <input 
            ref={element => this.fileInput = element} 
            onChange={this.handleLoadFile}
            type="file"
            name="file"
            className="file"
            id="file"
            hidden
          />
          <label className="load-file-button" htmlFor="file">LOAD FILE</label>
        </form>
        <br/>
        <Code code={this.state.code} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));