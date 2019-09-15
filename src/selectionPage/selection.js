import React, { Component } from 'react';
import Dropdown from './dropdown';
import {Button, Container } from '@material-ui/core';
import { connect } from 'react-redux'; 
import axios from 'axios';

import { findFalconeSuccess, findFalconeFailure, getError } from '../redux/actions'
import { FIND_API, TOKEN_API, PLANET_API, SPACESHIP_API } from '../resources/apiList';

class SelectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missions: [
                { selectedPlanet: '', selectedShapeShip: '' },
                { selectedPlanet: '', selectedShapeShip: '' },
                { selectedPlanet: '', selectedShapeShip: '' },
                { selectedPlanet: '', selectedShapeShip: '' }
            ],
            spaceships: [],
            planets: [],
            authToken: '',
            submitButtonEnabled: false
        };
    }

    /**
     * Fetch data from API calls and set it to the component state
     */
    componentDidMount() {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.post(TOKEN_API)
            .then(res => {
                this.setState({authToken: res.data.token});
            })
            .catch(err => this.props.getError(err.message, this.props.history));

        axios.get(PLANET_API)
            .then(res => {
                /**
                 * {"name":"Donlon","distance":100}
                 */
                var planets = res.data.map(response => {
                    return {
                        value: response.name,
                        label: response.name,
                        distance: response.distance
                    };
                });
                this.setState({ planets: planets })
            })
            .catch(err => this.props.getError(err.message, this.props.history));

        axios.get(SPACESHIP_API)
            .then(res => {
                /*
                  {"name":"Space pod","total_no":2,"max_distance":200,"speed":2}
                */
                this.setState({spaceships: res.data });
            })
            .catch(err => this.props.getError(err.message, this.props.history));
    }

    /**
     * Function when clicked on 'Find Falcone' button
     * Makes a service call with request params to show either
     * success screen, failure screen or error screen
     */
    findFalcone() {
        const { authToken, missions } = this.state;
        const selectedPlanets = missions.map((mission) => {
            return mission.selectedPlanet;
        });
        const selectedSpaceships = missions.map((mission) => {
            return mission.selectedShapeShip;
        });
        const requestObj = {
            token: authToken,
            planet_names: selectedPlanets,
            vehicle_names: selectedSpaceships
        };
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.post(FIND_API, requestObj)
            .then(res => {
                (res.data.status === "success") ?
                    this.props.findFalconeSuccess(res.data.planet_name, this.props.history) :
                    this.props.findFalconeFailure(this.props.history);
            })
            .catch(err => this.props.getError(err.message, this.props.history));
    }

    /**
     * Handler function when value is Select component changes
     * @param {String} value 
     * @param {Integer} index 
     */
    handlerSelectChange(value, index) {
        let { missions } = this.state;

        missions[index].selectedPlanet = value;
        this.setState({ missions: missions });
    }

    /**
     * Handler function when something gets changed in the radio buttons
     * Updates the total count of spaceships available
     * Updates the total time to be taken by all spaceships selected so far
     * @param {String} value 
     * @param {Integer} index 
     */
    handlerRadioButtonChange(value, index) {
        let { missions, spaceships } = this.state;

        const shipIndex = spaceships.findIndex(element => {
            return element.name === value
        });
        spaceships[shipIndex].total_no -= 1;
        const previousSpaceship = missions[index].selectedShapeShip;
        if (previousSpaceship !== "") {
            const prevShipIndex = spaceships.findIndex(element => {
                return element.name === previousSpaceship
            });
            spaceships[prevShipIndex].total_no += 1;
        }
        missions[index].selectedShapeShip = value;
        this.updateTotalTime();
        this.setState({ missions: missions, spaceships: spaceships });
    }

    /**
     * Updates the total time the entire mission is going to take
     * Also decides if the submit button is to be enabled or disabled
     */
    updateTotalTime() {
        let { missions, planets, spaceships } = this.state;
        let totalTime = 0, missionsSelected = 0;
        missions.forEach(mission => {
            const planet = mission.selectedPlanet;
            const vehicle = mission.selectedShapeShip;

            const planetSelected = planets.find((planetObj) => {
                return planetObj.label === planet;
            });

            const vehicleSelected = spaceships.find((vehicleObj) => {
                return vehicleObj.name === vehicle;
            });
            if (planetSelected && vehicleSelected) {
                totalTime += (planetSelected.distance/vehicleSelected.speed);
                missionsSelected += 1;
            }          
        });
        this.setState({totalTime: totalTime, submitButtonEnabled: (missionsSelected === 4)});
    }

    render() {
        const planets = this.state.planets;
        const spaceships = this.state.spaceships;
        const missions = this.state.missions;
        const selectedPlanets = missions.map((mission) => {
            return mission.selectedPlanet;
        });
    
        return (
            <Container>
                <div className="row">
                    <div className="col-xs-12">
                        <p>You are detective Sheen. You have been tasked to find the enemy of state, Falcon.
                            Currently he is hidden in one of the known planets. You need to reach him and capture
                            him.
                        </p>
                        <p>Currently, our team can only carry out four missions simultaneously. We have a limited 
                            number of spaceships. Each spaceship has a maximum distance it can travel. We will only
                            show you spacehips that can possibly reached the planets.
                            Choose your missions carefully.
                        </p>
                    </div>
                </div>
                <div className="row">
                    {missions.map((mission, index) => {
                        return (
                            <div 
                                key={index} 
                                className="col-xs-12 col-sm-6 col-md-3 dropdowns">
                                <Dropdown
                                    index={index}
                                    planets={planets}
                                    spaceships={spaceships}
                                    selectedPlanets={selectedPlanets}
                                    selectedPlanet={mission.selectedPlanet}
                                    selectedShapeShip={mission.selectedShapeShip}
                                    onSelectChange={this.handlerSelectChange.bind(this)}
                                    onRadioButtonChange={this.handlerRadioButtonChange.bind(this)}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="row">
                    <div className="col-xs-12 text">    
                        Total time for the mission: {this.state.totalTime || 0}   
                    </div>
                </div>
                
                
                <div className="row">
                    <div className="col-xs-12">
                        <Button disabled={!this.state.submitButtonEnabled} variant="contained" color="primary" onClick={() => this.findFalcone()}>
                            Find Falcone
                        </Button>
                    </div>
                </div>
            </Container>
        );
    };
    
};

export default connect(
    null, 
    { findFalconeSuccess, findFalconeFailure, getError }
) (SelectionPage);
