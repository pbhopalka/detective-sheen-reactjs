import React, { Component } from "react";
import { Button } from "@material-ui/core";

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ErrorPage extends Component{
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text">
                        <p>Some error happened!!</p>
                        {this.props.errorMessage}
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-offset-3">
                        <Link to="/">
                            <Button variant="contained" color="primary">
                                Start again
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    errorMessage: state.reducers.errorMessage
});

export default connect(mapStateToProps)(ErrorPage);