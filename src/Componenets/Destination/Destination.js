// import { Map } from 'google-maps-react';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Map from '../Map/Map';
import './Destination.css';



const Destination = () => {
    const { id } = useParams();
    const { vehicles } = useContext(UserContext);
    const [allVehicle, setAllVehicle] = vehicles;
    const [data, setData] = useState(null);
    const [print, setPrint] = useState(false);
    const [status, setStatus] = useState(true);
    console.log(allVehicle);
    const motoTypes = allVehicle.find((data) => data.id === id);
    // console.log(product.catagory);
    console.log(id);
    const getData = (e) => {
        if (e.target.name === 'first') {
            const newUserInfo = { ...data };
            newUserInfo[e.target.name] = e.target.value
            setData(newUserInfo)
            setPrint(false);
        }
        if (e.target.name === 'second') {
            const newUserInfo = { ...data };
            newUserInfo[e.target.name] = e.target.value
            setData(newUserInfo)
            setPrint(false);
        }
        if (e.target.name === 'date') {
            const newUserInfo = { ...data };
            newUserInfo[e.target.name] = e.target.value
            setData(newUserInfo)
            setPrint(false);
        }

    }

    const setBoth = () => {
        setPrint(true);
        setStatus(!status);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBoth();
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">

                    <div className="col-md-4 first-sec bg-secondary rounded">
                        {
                            status ?
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-3 text-white">
                                        <div className="mb-3">
                                            <label for="text1" className="form-label">Pick From</label>
                                            <input type="text" name="first" className="form-control" id="text1" onChange={getData} autocomplete="off" required />
                                        </div>
                                        <div className="mb-3">
                                            <label for="text1" className="form-label">Pick To</label>
                                            <input type="text" name="second" className="form-control" id="text1" onChange={getData} autocomplete="off" required />
                                        </div>
                                        <div className="mb-3">
                                            <label for="start" className="form-label">Date</label>
                                            <br />
                                            <input type="date" name="date" id="start" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>
                                </form>
                                : null
                        }
                        {
                            print ?
                                <div className="mb-3">
                                    <div  className="bg-warning p-3 mt-5 rounded">
                                            <h4>From: {data?.first}</h4>
                                            <h4>To: {data?.second}</h4>
                                            
                                    </div>
                                    <div className="d-flex align-content-center mt-3 bg-light p-4 rounded">
                                        <img className="img-fluid images" src={motoTypes.avatar} alt="" />
                                        <p>{motoTypes.catagory} </p>
                                        <p><i className="fas fa-user-friends"> {motoTypes.spaces}</i></p>
                                        <p>${motoTypes.salary}</p>
                                    </div>
                                    <div className="d-flex align-content-center mt-3 bg-light p-4 rounded">
                                        <img className="img-fluid images" src={motoTypes.avatar} alt="" />
                                        <p>{motoTypes.catagory} </p>
                                        <p><i className="fas fa-user-friends"> {motoTypes.spaces}</i></p>
                                        <p>${motoTypes.salary1}</p>
                                    </div>
                                    <div className="d-flex align-content-center mt-3 bg-light p-4 rounded">
                                        <img className="img-fluid images" src={motoTypes.avatar} alt="" />
                                        <p>{motoTypes.catagory} </p>
                                        <p><i className="fas fa-user-friends"> {motoTypes.spaces}</i></p>
                                        <p>${motoTypes.salary2}</p>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    <div className="col-md-8">
                        <Map></Map>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;