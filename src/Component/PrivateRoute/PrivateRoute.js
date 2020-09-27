import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserLoggedInContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                userLoggedIn.isLoggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;