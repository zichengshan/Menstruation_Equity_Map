import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {BsBuilding} from 'react-icons/bs'

const ControlledPopup = ({id, open, closeModal,building_name, distance, walking_time,floors}) => {

    const floorList = floors?.map(floor => {
        return <div className='pop--floor'>
            <br/>
            <h2 className='pop--floorName'>Floor {floor.name}</h2>
            <p className='pop--available'><b>{floor.validRoomNum}</b> restroom(s) menstruation products available</p>
        </div>
    })

    return (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="pop">
                <div className="pop--title">
                    <BsBuilding size='2.5em'/>
                    <div className='pop--detail'>
                        <h3 className='pop--buildingName'>{building_name}</h3>
                        <p className="pop--distance">{distance} | {walking_time} mins walking</p>
                    </div>
                    <a className="pop--close" onClick={closeModal}> (X) </a>
                </div>
                {floorList}
            </div>
        </Popup>
    )
}

export default ControlledPopup