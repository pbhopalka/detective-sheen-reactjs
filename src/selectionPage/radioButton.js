import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { Component } from 'react';

class RadioButton extends Component {

    render() {
        const spaceships = this.props.spaceships;
        const radioButtons = spaceships.map((spaceship, index) =>
            <FormControlLabel 
                key={index}
                value={spaceship.name} 
                control={<Radio disabled={spaceship.total_no === 0}/>} 
                label={spaceship.name + " (Remaining: " + spaceship.total_no + ")"} 
            />
        );

        return (
            <div>
                <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                    aria-label="Spaceship"
                    name="spaceship"
                    value={this.props.selectedShapeship}
                    onChange={this.props.onRadioButtonChange.bind(this)}
                >
                    {radioButtons}

                </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

export default RadioButton;