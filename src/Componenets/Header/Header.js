import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const { log } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = log;
    console.log(loggedIn);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <Link to="/home"className="navbar-brand">Gems Of Riders</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
                            <Link to="/login" className="nav-link">Destination</Link>
                            {
                                loggedIn.email ? <h4>{loggedIn.email}</h4> : <Link to="/login" className="nav-link">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;