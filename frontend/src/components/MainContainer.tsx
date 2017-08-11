import * as React from 'react';
import SearchInput from './SearchInput';
import MapContainer from './Map';
import * as actions from '../actions/airportActions';
import { connect } from 'react-redux';
import { MainContainerState, AppState, ContainerActions, KeyPress } from '../interfaces';
import { AirportWithId } from '../../../types';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import './styles.css';

class MainContainer extends React.Component<AppState & ContainerActions, MainContainerState> {
    state = {
        fromQuery: '',
        toQuery: '',
        distance: 0,
        buttonClicked: false,
        fromIndex: -1,
        toIndex: -1,
        fromAirport: {
            id: 0,
            code: '',
            city: '',
            name: '',
            lat: 0,
            lon: 0
        },
        toAirport: {
            id: 0,
            code: '',
            city: '',
            name: '',
            lat: 0,
            lon: 0
        }
    };

    handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (this.state.fromAirport.id && this.state.toAirport.id) {
                this.computeDistance();
            }
        }
    }

    clearAll = () => {
        let fromAirport: AirportWithId = {
            id: 0,
            code: '',
            city: '',
            name: '',
            lat: 0,
            lon: 0
        };
        let toAirport: AirportWithId = {
            id: 0,
            code: '',
            city: '',
            name: '',
            lat: 0,
            lon: 0
        };
        this.setState({ fromQuery: '', toQuery: '', distance: 0, fromAirport, toAirport, buttonClicked: true }, () => {
            this.setState({ buttonClicked: false });
        });
    }

    componentDidMount() {
        let current = findDOMNode(this);
        current.addEventListener('keyup', this.handleEnter);
    }

    componentWillUnmount() {
        let current = findDOMNode(this);
        current.removeEventListener('keyup', this.handleEnter);
    }

    fromHandler = (e: any) => {
        this.setState({ fromQuery: e.target.value, fromIndex: -1 }, () => {
            if (this.state.fromQuery) {
                this.props.getFromAirports(this.state.fromQuery);
            } else {
                this.props.clearFromAirports();
            }
        });
    }

    toHandler = (e: any) => {
        this.setState({ toQuery: e.target.value, toIndex: -1 }, () => {
            if (this.state.toQuery) {
                this.props.getToAirports(this.state.toQuery);
            } else {
                this.props.clearToAirports();
            }
        });
    }

    selectFrom = (airport: AirportWithId) => {
        this.setState({ fromQuery: airport.name, fromAirport: airport }, () => {
            this.props.clearFromAirports();
        });
    }

    selectTo = (airport: AirportWithId) => {
        this.setState({ toQuery: airport.name, toAirport: airport }, () => {
            this.props.clearToAirports();
        });
    }

    fromKeyScroll = (event: KeyPress) => {
        if (event === 'ArrowDown') {
            if (this.props.fromAirports.length > this.state.fromIndex) {
                this.setState((prevState: MainContainerState) => {
                    return prevState.fromIndex++;
                });
            }
        } else {
            if (this.state.toIndex !== 0) {
                this.setState((prevState: MainContainerState) => {
                    return prevState.fromIndex--;
                });
            }
        }
    }

    toKeyScroll = (event: KeyPress) => {
        if (event === 'ArrowDown') {
            this.setState((prevState: MainContainerState) => {
                return prevState.toIndex++;
            });
        } else {
            this.setState((prevState: MainContainerState) => {
                return prevState.toIndex--;
            });
        }
    }

    computeDistance = async () => {
        let fromCoordiantes = {
            lat: this.state.fromAirport.lat,
            lon: this.state.fromAirport.lon
        };
        let toCoordinates = {
            lat: this.state.toAirport.lat,
            lon: this.state.toAirport.lon
        };
        const params = {
            from: fromCoordiantes,
            to: toCoordinates
        };
        let response = await axios.post('/api/distance', params);

        let distance = Math.ceil(response.data.distance * 0.539957);
        this.setState({ distance: distance, buttonClicked: true }, () => {
            this.setState({ buttonClicked: false });
        });
    }

    render() {
        return (
            <div className="container form-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="map-container">
                            <MapContainer
                                buttonClicked={this.state.buttonClicked}
                                toAirport={this.state.toAirport}
                                fromAirport={this.state.fromAirport}
                            />
                        </div>
                        <br />
                        <form className="search-form">
                            <div className="col-xs-4">
                                <SearchInput
                                    keyPressScroll={this.fromKeyScroll}
                                    currentIndex={this.state.fromIndex}
                                    selectAirport={this.selectFrom}
                                    airports={this.props.fromAirports}
                                    changeHandler={this.fromHandler}
                                    value={this.state.fromQuery}
                                />
                            </div>
                            <div className="col-xs-4">
                                <SearchInput
                                    keyPressScroll={this.toKeyScroll}
                                    currentIndex={this.state.toIndex}
                                    selectAirport={this.selectTo}
                                    airports={this.props.toAirports}
                                    changeHandler={this.toHandler}
                                    value={this.state.toQuery}
                                />
                            </div>
                            <div className="col-xs-4">
                                <button
                                    disabled={!(this.state.fromAirport.id && this.state.toAirport.id)}
                                    type="button"
                                    onClick={this.computeDistance}
                                    className="btn btn-primary">
                                    Calculate
                                </button>
                                <button
                                    type="button"
                                    onClick={this.clearAll}
                                    className="btn btn-default">
                                    Clear
                                </button>
                            </div>
                            <h3>{this.state.distance}</h3>
                        </form>
                    </div>
                </div>
            </div>

        );

    }
}

function mapStateToProps(state: AppState) {
    return {
        fromAirports: state.fromAirports,
        toAirports: state.toAirports
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getFromAirports: (query: string) => dispatch(actions.getFromAirports(query)),
        getToAirports: (query: string) => dispatch(actions.getToAirports(query)),
        clearFromAirports: () => dispatch(actions.clearFromAirports()),
        clearToAirports: () => dispatch(actions.clearToAirports())
    };
}

export default connect<AppState, ContainerActions, any>(mapStateToProps, mapDispatchToProps)(MainContainer);