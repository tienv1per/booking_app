import React, { useContext, useState } from 'react';
import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import {SearchContext} from '../../context/SearchContext';

export const Hotel = () => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const location = useLocation().pathname;
	const path = location.split('/')[2];
	const {data, loading, error} = useFetch(`http://localhost:8000/api/hotels/find/${path}`);
	console.log(data);

	const photos = [
		{
			src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
		},
		{
			src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
		},
		{
			src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
		},
		{
			src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
		},
		{
			src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
		},
		{
			src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
		},
	];

	const { dates, options } = useContext(SearchContext);

	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

	function dayDifference(date1, date2) {
		const timeDiff = Math.abs(date2.getTime() - date1.getTime());
		const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
		return diffDays + 1;
	}
  
	const days = dayDifference(dates[0].endDate, dates[0].startDate);

	const handleOpen = (index) => {
		setSlideNumber(index);
		setOpen(true);
	}

	const handleMove = (side) => {
		let index;
		if (side === "left") {
			index = slideNumber === 0 ? 5 : slideNumber - 1;
		}
		else {
			index = slideNumber === 5 ? 0 : slideNumber + 1;
		}
		setSlideNumber(index);

	}

	return (
		<div className='hotel'>
			<Navbar/>
			<Header type="list"/>
			{loading ? "Loading please wait" : <div className='hotelContainer'>
				{open && <div className='slider'>
					<FontAwesomeIcon 
						icon={faCircleXmark} 
						className='close' 
						onClick={() => setOpen(false)}	
					/>
					<FontAwesomeIcon 
						icon={faCircleArrowLeft} 
						className='arrow'
						onClick={() => handleMove("left")}	
					/>
					<div className='sliderWrapper'>
						<img
							className='sliderImg'
							src={photos[slideNumber].src}
							alt=''
						/>
					</div>
					<FontAwesomeIcon 
						icon={faCircleArrowRight} 
						className='arrow'
						onClick={() => handleMove("right")}	
					/>
				</div>}
				<div className='hotelWrapper'>
					<div className='hotelText'>
						<h1 className='hotelTitle'>{data.name}</h1>
						<div className='hotelAddress'>
							<FontAwesomeIcon icon={faLocationDot}/>
							<span>{data.address}</span>
						</div>
						<span className='hotelDistance'>
							Excellent location – {data.distance}m from center
						</span>
						<span className='hotelPriceHighlight'>
							Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
						</span>
					</div>
					<div className='hotelImages'>
						{photos.map((photo, index) => {
							return (
								<div className='hotelImgWrapper' key={index}>
									<img
										onClick={() => handleOpen(index)}
										src={photo.src}
										alt=''
										className='hotelImg'
									/>
								</div>
							)
						})}
					</div>
					<div className='hotelDetails'>
					<div className="hotelDetailsTexts">
						<h1 className="hotelTitle">{data.title}</h1>
						<p className="hotelDesc">
							{data.desc}
						</p>
            		</div>
						<div className='hotelDetailsPrice'>
							<h1>Perfect for a {days}-night stay!</h1>
							<span>
								Located in the real heart of Krakow, this property has an
								excellent location score of 9.8!
							</span>
							<h2>
								<b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
							</h2>
							<button>Reserve or Book Now!</button>
						</div>
					</div>
				</div>
				<MailList/>
				<Footer/>
			</div>}
		</div>
	)
}
