import React, { Component } from "react";
import { Button } from "@material-ui/core";

import { Link } from 'react-router-dom';

class NotFound extends Component{
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text">
                        Sorry. We didn't find the Falcone in any of the planets that you went. He's still managed
                        to escape your paws.
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-offset-3">
                        <Link to="/">
                            <Button variant="contained" color="primary">
                                Try Again
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;