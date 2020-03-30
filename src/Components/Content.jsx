import React, { Component } from "react";
import axios from "axios";
import cloneDeep from "clone-deep";
import Search from "./Search";
import Details from "./Details";

class Content extends Component {
  state = {
    coordinates: null
  };

  changeCity = coords => {
    let newState = cloneDeep(this.state);
    newState.coordinates = coords;
    this.setState(newState);
  };

  render() {
    return (
      <div className="full">
        <Search changeCity={this.changeCity} />
        {this.state.coordinates ? (
          <Details coordinates={this.state.coordinates} />
        ) : null}
      </div>
    );
  }
}

export default Content;
