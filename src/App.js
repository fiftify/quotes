import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {withAuthenticator} from 'aws-amplify-react';
import {Storage} from 'aws-amplify';



class S3Image extends Component {
  render() {
    const file = this.props.file;
    return (
      <article key={file}>
        <img src={file} height="200px"/>
      </article>
    )
  }
}





class App extends Component {
  
  state = {
    files:[]
  }
  
  async componentDidMount() {
    const files = await Storage.list('');
    const urls = await Promise.all(files.map(async (file) => await Storage.get(file.key)));
    this.setState({ files:urls });
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    if(nextState !== this.state) {
      return true;  
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    const file = this.fileInput.files[0];
    const { name } = file;
    
    Storage.put(name, file).then(response => {
      console.log('Storage.put', { response });
      this.setState({ files: [...this.state.files, response ] })
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <section className="Application-images">
          { this.state.files.map(file => (
             <S3Image file={file} key={file} />
           )) }
        </section>
        <form onSubmit={this.handleSubmit}>
        <input type="file" ref={(ref) => this.fileInput = ref} />
        <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}





export default withAuthenticator(App, { includeGreetings: true });
