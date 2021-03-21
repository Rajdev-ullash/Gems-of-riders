import React, { useContext, useEffect, useState } from 'react';
import MotoInfo from '../MotoInfo/MotoInfo';
import { UserContext } from '../../App';
import './Home.css'


const Home = () => {
    const {vehicles} = useContext(UserContext);
    const [allVehicle, setAllVehicle] = vehicles;
    console.log(allVehicle);
    // const [vehicle, setVehicle] = useState([]);

    useEffect(() => {
        // setVehicle(users)
        setAllVehicle(users)
    }, []);

    const users =
        [{
            "avatar": "https://i.ibb.co/yQyW2kf/Frame.png",
            "catagory": "Bike",
            "salary": "65",
            "salary1": "72",
            "salary2": "60",
            "spaces": "1",
            "id": "1",
        }, {
            "avatar": "https://i.ibb.co/fC011qZ/Frame-2.png",
            "catagory": "Car",
            "salary": "100",
            "salary1": "130",
            "salary2": "110",
            "spaces": "4",
            "id": "2",
        }, {
            "avatar": "https://i.ibb.co/t893r7j/Frame-1.png",
            "catagory": "Bus",
            "salary": "33",
            "salary1": "30",
            "salary2": "40",
            "spaces": "42",
            "id": "3",

        }, {
            "avatar": "https://i.ibb.co/kmym9ZJ/Group.png",
            "catagory": "Train",
            "salary": "50",
            "salary1": "40",
            "salary2": "55",
            "spaces": "400",
            "id": "4",
        },
        ]
    return (
        <div className="all-sec">
            <div className="row justify-content-center mt-5">
                {
                    allVehicle.map(user => <MotoInfo user={user}></MotoInfo>)
                }
            </div>
        </div>
    );
};

export default Home;