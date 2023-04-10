import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import './list.css';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

export const List = () => {
	const location = useLocation();
	const [destination, setDestination] = useState(location.state.destination);
	const [date, setDate] = useState(location.state.date);
	const [options, setOptions] = useState(location.state.options);
	const [minPrice, setMinPrice] = useState(undefined);
	const [maxPrice, setMaxPrice] = useState(undefined);

	const [openDate, setOpenDate] = useState(false);

	const {data, loading, error, reFetch} = useFetch(`http://localhost:8000/api/hotels?city=${destination}&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 9999}`);

	const handleSearch = () => {
		// reFetch();
	}

	return (
		<div>
			<Navbar/>
			<Header type="list"/>
			<div className='listContainer'>
				<div className='listWrapper'>
					<div className='listSearch'>
						<h1 className='lsTitle'>Search</h1>
						<div className='lsItem'>
							<label>Destination</label>
							<input 
								type='text' 
								placeholder={destination}
							/>
						</div>
						<div className='lsItem'>
							<label>Check-in Date</label>
							<span onClick={() => setOpenDate(!openDate)}>
								{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
							</span>
							{openDate && <DateRange
								onChange={item => setDate([item.selection])}
								minDate={new Date()}
								ranges={date}
							/>}
						</div>
						<div className='lsItem'>
							<label>Options</label>
							<div className='lsOptions'>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Min Price <small>per night</small></span>
									<input 
										min={0}
										max={10000}
										type='number' 
										className='lsOptionInput'
										value={minPrice}	
										onChange={e => setMinPrice(e.target.value)}
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Max Price <small>per night</small></span>
									<input 
										min={0}
										max={100000}
										type='number' 
										className='lsOptionInput'
										value={maxPrice}
										onChange={e => setMaxPrice(e.target.value)}	
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Adult</span>
									<input type='number' min={1} className='lsOptionInput' placeholder={options["adult"]}/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Children</span>
									<input type='number' min={0} className='lsOptionInput' placeholder={options["children"]}/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Room</span>
									<input type='number' min={1} className='lsOptionInput' placeholder={options["room"]}/>
								</div>
							</div>
						</div>
						<button onClick={handleSearch}>Search</button>
					</div>
					<div className='listResult'>
						{loading ? "Loading please wait" : <>
							{data.map((item, index) => {
								return (
									<SearchItem key={index} item={item}/>
								)})
							}
						</>}
					</div>
				</div>
			</div>
		</div>
	)
}
