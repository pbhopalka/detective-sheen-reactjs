import React, { Component } from 'react';
import Select from 'react-select';
import RadioButton from './radioButton';

class Dropdown extends Component {

    onSelectUpdate(e) {
        const { onSelectChange, index } = this.props;

        onSelectChange(e.value, index);
    }

    onRadioButtonUpdate(e, val) {
        const { onRadioButtonChange, index } = this.props;
        console.log(val);
        onRadioButtonChange(val, index)
    }

    filterPlanets (planets, selectedPlanets) {
        return planets.filter((planet) => {
            return selectedPlanets.indexOf(planet.label) < 0;
        });
    }

    render() {
        const planets = this.props.planets;
        const planetList = planets.length ? this.filterPlanets(planets, this.props.selectedPlanets) : planets;
        const selectedPlanet = this.props.selectedPlanet;
        let eligibileSpaceships = this.props.spaceships;
        
        if (selectedPlanet !== "") {
            const planetIndex = planets.findIndex(planet => {
                return planet.label === selectedPlanet
            });
            const selectedPlanetDistance = planets[planetIndex].distance;
            eligibileSpaceships = this.props.spaceships.filter(spaceship => {
                return spaceship.max_distance >= selectedPlanetDistance;
            });
        }
        

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