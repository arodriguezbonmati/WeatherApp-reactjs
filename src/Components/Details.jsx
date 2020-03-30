import React, { Component } from "react";
import axios from "axios";
import urlDarksky from "../config.json";
import therm from "./Images/Thermometer.svg";
import clouds from "./Images/Clouds.svg";

class Details extends Component {
  state = {
    place_info: null
  };

  getInfo = () => {
    console.log(this.props.coordinates);
    const url = `${urlDarksky.darksky.proxy}${urlDarksky.darksky.base_url}${urlDarksky.darksky.api_key}/${this.props.coordinates[1]},${this.props.coordinates[0]}`;
    axios.get(url).then(response => {
      this.setState({ place_info: response.data });
    });
  };

  render() {
    console.log(this.state.place_info);
    return (
      <div>
        {this.state.place_info === null ? null : (
          <div className="place_info">
            <div className="current_info">
              <img src={therm} alt="" className="image" />
              <p className="info">
                {Math.round(
                  (this.state.place_info.currently.temperature - 32) / 1.8
                )}{" "}
                ºC
              </p>
            </div>
            <div className="current_info">
              <img src={clouds} alt="" className="image" />
              <p className="info">
                {Math.round(
                  this.state.place_info.currently.precipProbability * 100
                )}{" "}
                %
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate() {
    if (
      this.state.place_info.latitude !== this.props.coordinates[1] &&
      this.state.place_info.longitude !== this.props.coordinates[0]
    ) {
      this.getInfo();
    }
  }
}
export default Details;
