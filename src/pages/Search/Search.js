import React, { Component } from "react";
import pathService from "../../utils/pathService";
import yelpAPI from "../../utils/yelpAPI";
//import googleAPI from "../../utils/googleAPI";
import "./Search.css";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchRequest: {
                term: "",
                location: ""
            },
            places: [],
            paths: {},
            chosenPlace: ""
        };
    }

    async componentDidMount() {
        const paths = await pathService.getAllPaths();
        if (paths.length) {
            this.setState({
                ...this.state.searchRequest,
                ...this.state.chosenPlace,
                ...this.state.places,
                paths: paths
            });
        }
    }

    // TODO GOOGLE_API
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
        if (this.state.places.length > 0) {
            this.setState({
                ...this.state.searchRequest,
                ...this.state.chosenPlace,
                ...this.state.paths,
                places: []
            });
        }
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
                places: fetchedPlaces,
                ...this.state.chosenPlace,
                ...this.state.paths
            });
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
            ...this.state.paths,
            ...this.state.chosenPlace,
            ...this.state.places
        });
    };

    savePlace = async place => {
        this.setState({
            chosenPlace: place,
            ...this.state.searchRequest,
            ...this.state.paths,
            ...this.state.places
        });
    };

    addToPath = pathId => {
        pathService.getOnePathAndSave(pathId, this.state.chosenPlace);
    };

    render() {
        return (
            <div className="pages-bg">
                <div className="basic-top-margin">
                    <div className="m-5 p-5 border rounded col-sm-10 mx-auto green scroll">
                        <header>
                            <h2 className="mb-5 font-weight-bold basic-title">
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
                                    placeholder="Ex. museum"
                                    name="term"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <button
                                    className="btn btn-outline-dark mb-5"
                                    onClick={this.getAPI}
                                >
                                    Find
                                </button>
                            </div>
                        </form>
                        <div className="line mb-2" />
                        <div className="d-flex justify-content-around w-90 flex-wrap scroll places-found-div mt-5">
                            {this.state.places.length > 0 ? (
                                this.state.places.map((onePlace, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="col-sm-3 place-div border rounded p-3 m-3"
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
                                            <div className="d-flex justify-content-around align-items-end">
                                                <a
                                                    className="place-link "
                                                    href={onePlace.url}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                >
                                                    More
                                                </a>
                                                <button
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target="#newPlace"
                                                    className="btn btn-outline-dark mt-2"
                                                    onClick={() =>
                                                        this.savePlace(onePlace)
                                                    }
                                                >
                                                    Add To Path
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <h3 className="mt-3">No places found.</h3>
                            )}
                        </div>
                    </div>
                    <div
                        id="newPlace"
                        className="modal mx-auto"
                        tabIndex="-1"
                        role="dialog"
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="modal-content green">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Choose a Path
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {this.state.paths.length ? (
                                        this.state.paths.map((path, idx) => (
                                            <button
                                                key={idx}
                                                className="btn btn-outline-dark m-4"
                                                data-dismiss="modal"
                                                onClick={() =>
                                                    this.addToPath(path._id)
                                                }
                                            >
                                                {path.country}
                                            </button>
                                        ))
                                    ) : (
                                        <h3>You have no paths yet...</h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default Search;
