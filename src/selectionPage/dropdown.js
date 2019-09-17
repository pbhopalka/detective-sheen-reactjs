import React, { Component } from 'react';
import Select from 'react-select';
import RadioButton from './radioButton';

class Dropdown extends Component {

    /**
     * Handler function which gets called when select value is changed
     * @param {EventObject} e 
     */
    onSelectUpdate(e) {
        const { onSelectChange, index } = this.props;

        onSelectChange(e.value, index);
    }

    /**
     * Handler function which gets called when radio button is selected/updated
     * @param {EventObject} e 
     * @param {String} val 
     */
    onRadioButtonUpdate(e, val) {
        const { onRadioButtonChange, index } = this.props;

        onRadioButtonChange(val, index)
    }

    /**
     * Returns the list of planets that are still available for the choice
     * @param {Object[]} planets 
     * @param {String[]} selectedPlanets 
     */
    filterPlanets (planets, selectedPlanets) {
        return planets.filter((planet) => {
            return selectedPlanets.indexOf(planet.label) < 0;
        });
    }

    /**
     * Returns the list of eligible spaceships based on the distance it can travel
     * and the planet selected
     * @param {Object[]} planets 
     * @param {Object[]} spaceships 
     * @param {String} selectedPlanet 
     */
    findEligibleSpaceships(planets, spaceships, selectedPlanet) {
        if (selectedPlanet !== "") {
            const planetObj = planets.find(( {label}) => {
                return label === selectedPlanet
            });
            const selectedPlanetDistance = planetObj.distance;
            return spaceships.filter(({max_distance}) => {
                return max_distance >= selectedPlanetDistance;
            });
        }
        return spaceships;
    }

    render() {
        const planets = this.props.planets;
        const spaceships = this.props.spaceships;
        const planetList = planets.length ? this.filterPlanets(planets, this.props.selectedPlanets) : planets;
        const selectedPlanet = this.props.selectedPlanet;
        const eligibileSpaceships = this.findEligibleSpaceships(planets, spaceships, selectedPlanet);
        
        return (
            <div>
                <Select 
                    label={selectedPlanet}
                    options={planetList}
                    onChange={this.onSelectUpdate.bind(this)}
                    placeholder="Choose your planet"
                    isLoading={!(planets.length > 0)}

                />
                {selectedPlanet && (
                    <RadioButton 
                        spaceships={eligibileSpaceships}
                        selectedSpaceship={this.props.selectedSpaceship}
                        onRadioButtonChange={this.onRadioButtonUpdate.bind(this)}
                    />
                )}
            </div>  
        )
    }
}

export default Dropdown;