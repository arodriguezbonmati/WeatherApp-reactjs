import React, { Component } from "react";
import axios from "axios";
import mapboxurl from "../config.json"
import Styles from "./Styles.css";

class Search extends Component {
    state = {
        cities: []
    };

    getCities = city => {
        if(city){
            const { access_token, base_url } = mapboxurl.mapbox;
            const url = `${base_url}${city}.json?`;
            axios.get(url, {
                params: {
                    access_token: access_token,
                    autocomplete: true
                }
            }).then(response => {
                const cities = response.data.features.map(city => {
                    return {
                        place_id: city.id,
                        place_name: city.place_name,
                        coordinates: city.center,
                        place_type: city.place_type[0]
                    };
                });
                this.setState({cities: cities});
            })
        }
    }

    render () {
        return(
        <div className="Search">
            <div className="input_name">
                <input className="inputPlace" id="search" type="text" placeholder="e.g. Madrid"></input>
                <button className="clickSearch" onClick={() => 
                    this.getCities(document.getElementById("search").value)
                }>
                    Search
                </button>
            </div>
            {console.log(this.state.cities)}
            <div className="results">
                {this.state.cities.map(city => {
                    return (
                        <div className="show" key={city.place_id}>
                            <p onClick={() => this.props.changeCity(city.coordinates)}>{city.place_name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        )
    }
}

export default Search;