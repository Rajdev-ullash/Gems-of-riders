import React, { } from 'react';
import { Link } from 'react-router-dom';
import './MotoInfo.css';
const MotoInfo = (props) => {
    const { avatar, catagory, id } = props.user;
    return (
        <div className="col-md-3 col-12">
            <Link to={`/destination/${id}`}  style={{ textDecoration: 'none', color:'black'}} >
                <div className="card  moto-card justify-content-center justify-content-sm-center align-items-center align-items-sm-center text-center text-sm-center d-flex m-3" style={{ width: "18rem" }}>
                    <img src={avatar} className="card-img-top img-fluid mt-3 image" alt="..." />
                    <div className="card-body mt-3">
                        <h5 className="card-title">{catagory}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MotoInfo;