import React,{ Component } from "react";
import { Button } from "@material-ui/core";

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ConfirmationScreen extends Component {
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text">
                        Congratulations. You found the falcone at {this.props.winningPlanet}
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <Link to="/">
                            <Button variant="contained" color="primary">
                                Play Again
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    winningPlanet: state.reducers.planetFound
});

export default connect(mapStateToProps, null) (ConfirmationScreen);