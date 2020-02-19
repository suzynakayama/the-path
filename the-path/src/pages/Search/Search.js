import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import yelpAPI from "../../utils/yelpAPI";
import googleAPI from "../../utils/googleAPI";
import "./Search.css";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchRequest: {
                term: "",
                location: ""
            },
            places: []
        };
    }

    // GOOGLE_API
    // getAPI = async evt => {
    //     evt.preventDefault();
    //     try {
    //         let searchRequestQuery = `q=${this.state.searchRequest.term}`;
    //         let res = await googleAPI.fetchAll(searchRequestQuery);
    //         console.log(res);
    //         this.setState({
    //             searchRequest: {
    //                 term: "",
    //                 location: ""
    //             }
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // YELP_API
    getAPI = async evt => {
        evt.preventDefault();
        try {
            let searchRequestQuery = `term=${this.state.searchRequest.term}&location=${this.state.searchRequest.location}&limit=50`;
            let res = await yelpAPI.fetchAll(searchRequestQuery);
            let fetchedPlaces = [];
            for (let i = 0; i < 50; i++) {
                let newPlace = {
                    name: res[i].name,
                    image: res[i].image_url,
                    url: res[i].url,
                    location: res[i].location.display_address,
                    phone: res[i].display_phone
                };
                fetchedPlaces.push(newPlace);
            }
            this.setState({
                searchRequest: {
                    term: "",
                    location: ""
                },
                places: fetchedPlaces
            });
            console.log(this.state.places);
        } catch (err) {
            console.log(err);
        }
    };

    handleChange = evt => {
        this.setState({
            searchRequest: {
                ...this.state.searchRequest,
                [evt.target.name]: evt.target.value
            },
            ...this.state.places
        });
    };

    render() {
        return (
            <div>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <br />
                <div className="main-line"></div>
                <br />
                <div className="mt-5">
                    <div className="m-5 p-5 border rounded col-sm-8 mx-auto green">
                        <header>
                            <h2 className="mb-5 font-weight-bold">
                                Find Places
                            </h2>
                        </header>
                        <form
                            className="form-horizontal"
                            onSubmit={this.getAPI}
                        >
                            <div className="form-group row d-flex justify-content-around">
                                <label className="col-sm-1 col-form-label">
                                    Location:
                                </label>
                                <input
                                    type="text"
                                    className="form-control col-sm-4"
                                    value={this.state.searchRequest.location}
                                    placeholder="ex. san francisco, ca"
                                    name="location"
                                    onChange={this.handleChange}
                                />
                                <label className="col-sm-1 col-form-label">
                                    Place:
                                </label>
                                <input
                                    type="text"
                                    className="form-control col-sm-4"
                                    value={this.state.searchRequest.term}
                                    placeholder="Ex. coffee"
                                    name="term"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group mt-5">
                                <button
                                    className="btn btn-outline-light"
                                    onClick={this.getAPI}
                                >
                                    Find
                                </button>
                            </div>
                        </form>
                        <div className="line mb-2" />
                        <div className="d-flex justify-content-around w-90 flex-wrap scroll">
                            {this.state.places.length > 0
                                ? this.state.places.map(onePlace => {
                                      return (
                                          <a
                                              className="col-sm-3"
                                              href={onePlace.url}
                                          >
                                              <div
                                                  key={onePlace.name}
                                                  className="place-div border rounded p-3 m-3"
                                              >
                                                  <h3>{onePlace.name}</h3>

                                                  <img
                                                      src={onePlace.image}
                                                      alt={onePlace.name}
                                                      className="place-image mt-2 mb-3"
                                                  />
                                                  <h6>{onePlace.phone}</h6>
                                                  <p className="mt-3">
                                                      {onePlace.location}
                                                  </p>
                                                  <button className="btn btn-outline-dark mt-2">
                                                      Add to Itinerary
                                                  </button>
                                              </div>
                                          </a>
                                      );
                                  })
                                : ""}
                        </div>
                    </div>
                </div>
                <br />
                <Footer />
            </div>
        );
    }
}

export default Search;
