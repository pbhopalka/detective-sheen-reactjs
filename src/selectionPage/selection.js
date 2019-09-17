import React, { Component } from 'react';
import Dropdown from './dropdown';
import {Button, Container } from '@material-ui/core';
import { connect } from 'react-redux'; 

import { fetchToken, fetchPlanets, fetchSpaceships, findFalcone, updateSpaceshipCount } from '../redux/actions'

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
            totalTime: 0,
            submitButtonEnabled: false
        };
    }

    /**
     * Fetch data from API calls and set it to the component state
     */
    componentDidMount() {
        const { history } = this.props;

        this.props.fetchToken(history);
        this.props.fetchPlanets(history);
        this.props.fetchSpaceships(history);
    }

    /**
     * Function when clicked on 'Find Falcone' button
     * Makes a service call with request params to show either
     * success screen, failure screen or error screen
     */
    findFalcone() {
        const { missions } = this.state;
        const selectedPlanets = missions.map((mission) => {
            return mission.selectedPlanet;
        });
        const selectedSpaceships = missions.map((mission) => {
            return mission.selectedShapeShip;
        });
        const requestObj = {
            token: this.props.authToken,
            planet_names: selectedPlanets,
            vehicle_names: selectedSpaceships
        };
        this.props.findFalcone(requestObj, this.props.history);
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
        const { missions } = this.state;
        const previousSpaceship = missions[index].selectedShapeShip;
        
        if (value !== previousSpaceship) {
            missions[index].selectedShapeShip = value;
            this.props.updateSpaceshipCount(value, previousSpaceship);
            this.updateTotalTime();
        }
    }

    /**
     * Updates the total time the entire mission is going to take
     * Also decides if the submit button is to be enabled or disabled
     */
    updateTotalTime() {
        const { missions } = this.state;
        const { planets, spaceships } = this.props;
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
        const { planets, spaceships } = this.props;
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
                        Total time for the mission: {this.state.totalTime}   
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

const mapStateToProps = state => ({
    planets: state.reducers.planets,
    spaceships: state.reducers.spaceships,
    authToken: state.reducers.token
});

const mapDispatchToProps = { 
    fetchToken, 
    fetchPlanets, 
    fetchSpaceships,
    findFalcone,
    updateSpaceshipCount 
};

export default connect(mapStateToProps, mapDispatchToProps) (SelectionPage);
