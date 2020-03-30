import React, { Component } from "react";
import cloneDeep from "clone-deep";
import Content from "./Components/Content";
import "./App.css";


class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <div className="content">
            <Content />
        </div>
      </div>
    );
  }
}

export default App;
