import './App.css';
import Navbar from './components/Navbar'
import List from './components/List'
import Map from './components/Map'
import Footer from './components/Footer'
import Filter from './components/Filter'
import React, {useState, useEffect} from 'react';
import {useGeolocated} from 'react-geolocated'
import Loading from './components/Loading'


function App() {
    const [buildingList, setBuildingList] = useState([]) 
    const [distance, setDistance] = useState(0.1)
    const [isLoading, setIsLoading] = useState(true)


    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        })

    useEffect(() => {

        const helper = (data) => {
            setBuildingList(data)
            setIsLoading(false)
        }

        const getBuildingList = () => {
            !isGeolocationAvailable ? (
                console.log("Your browser does not support Geolocation")
            ) : !isGeolocationEnabled ? (
               console.log("Geolocation is not enabled")
            ) : coords ? (
                fetch('http://ec2-54-214-227-92.us-west-2.compute.amazonaws.com:8080/search?' + new URLSearchParams({
                user_latitude: coords.latitude,
                user_longitude: coords.longitude,
                radius: distance
                }))
                .then(res => res.json())
                .then (data => helper(data))
                
            ) : (
                console.log("Getting the location data&hellip")
            )
        }

        getBuildingList()
    }, [distance,coords]);

    if (isLoading) {
        return (
            <div className="App" style={{
                height: "100vh"
            }}>
                <Navbar/>
                <Filter 
                distance = {distance}
                SetDistance = {setDistance}/>
                <Loading />
                <Footer/>
            </div>
        )
    }

    return (
        <div className="App" style={{
            height: "100vh"
        }}>
            <Navbar/>
                <Filter 
                    distance = {distance}
                    SetDistance = {setDistance}/>
            <div className='section'>
                <Map searchResult={buildingList}/>
                <List searchResult={buildingList}/>
            </div>
            <Footer/>
        </div>
    )
}

export default App;
