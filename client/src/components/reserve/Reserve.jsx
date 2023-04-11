import React, { useContext, useState } from 'react';
import axios from "axios";
import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const Reserve = ({setOpen, hotelId}) => {
	const [selectedRooms, setSelectedRooms] = useState([]);
	const {data} = useFetch(`http://localhost:8000/api/hotels/room/${hotelId}`);
	const {dates} = useContext(SearchContext);

	const navigate = useNavigate();

	const getDatesInRange = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const date = new Date(start.getTime());
		const listDate = [];

		while(date <= end){
			listDate.push(new Date(date).getTime());
			date.setDate(date.getDate() + 1);
		}
		return listDate;
	}

	const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

	const isAvalable = (roomNumber) => {
		const isFound = roomNumber.unavailableDates.some(date => {
			return allDates.includes(new Date(date).getTime());
		});
		return !isFound;
	}

	const handleSelect = (e) => {
		const checked = e.target.checked;
		const value = e.target.value;
		setSelectedRooms(
			checked ?
			[...selectedRooms, value] :
			selectedRooms.filter((item) => item !== value)
		);
		
	}

	const handleClick = async () => {
		try {
			await Promise.all(
				selectedRooms.map((roomId) => {
					const res = axios.put(`http://localhost:8000/api/rooms/available/${roomId}`, {
						dates: allDates,
					});
					return res.data;
				})
			);
			setOpen(false);
			navigate("/");
		} catch (err) {

		}
	  };

	return (
		<div className='reserve'>
			<div className='rContainer'>
				<FontAwesomeIcon 
					icon={faCircleXmark} 
					className='rClose' 
					onClick={() => setOpen(false)}
				/>
				<span>Select your rooms</span>
				{data.map((dataRoom, index) => {
					return (
						<div className='rItem' key={index}>
							<div className='rItemInfo'>
								<div className='rTitle'>{dataRoom.title}</div>
								<div className='rDesc'>{dataRoom.desc}</div>
								<div className='rMax'>Max people: <b>{dataRoom.maxPeople}</b></div>
								<div className='rPrice'>Price: <b>{dataRoom.price}</b></div>
							</div>	
							<div className='rSelectRooms'>
								{dataRoom.roomNumbers.map((room, i) => {
									return (
										<div className='room' key={i}>
											<label>{room.number}</label>
											<input 
												type='checkbox' 
												value={room._id} 
												onChange={handleSelect}	
												disabled={!isAvalable(room)}
											/>
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
				<button className='rButton' onClick={handleClick}>
					Reserve Now!
				</button>
			</div>
		</div>
	)
}

export default Reserve