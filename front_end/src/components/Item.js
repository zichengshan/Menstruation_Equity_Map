import React, { useState } from 'react'
import { BsBuilding } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import 'reactjs-popup/dist/index.css'
import ControlledPopup from './ControlledPopup'

function Item({ building_id,
    building_name,
    building_lat,
    building_lng,
    distance,
    walking_time,
    floors
}) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <div className='item' onClick={() => setOpen(o => !o)}>
            <BsBuilding size='2em' />
            <div className='item--body'>
                <h3 className='item--header'>{building_name}</h3>
                <div className='item--info'>
                    <MdLocationOn size='1.3em' />
                    <p className='item--distance'>{distance}</p>
                    <p className='item--text'>{walking_time}mins walking</p>
                </div>
            </div>

            <ControlledPopup
                id="id"
                open={open}
                // setOpen={setOpen}
                closeModal={closeModal}
                building_name={building_name}
                distance={distance}
                walking_time={walking_time}
                floors = {floors}
            />
        </div>
    )
}

export default Item
