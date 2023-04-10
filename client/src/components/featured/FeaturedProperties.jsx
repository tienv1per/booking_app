import React from 'react';
import './featuredProperties.css';
import useFetch from '../../hooks/useFetch';
const images = require('../../public/images');

const FeaturedProperties = () => {
    const {data, loading, error} = useFetch("http://localhost:8000/api/hotels?featured=true");
    const dataImage = images.images;

    return (
        <div className='fp'>
            {loading ? "Loading please wait" : <>
                {data.map((item, index) => {
                    return (
                        <div className='fpItem' key={index}>
                            <img
                                className='fpImg'
                                src={dataImage[index]}
                                alt=''
                            />
                            <span className='fpName'>{item.name}</span>
                            <span className='fpCity'>{item.city}</span>
                            <span className='fpPrice'>Starting from ${item.cheapestPrice}</span>
                            {item.rating && <div className='fpRating'>
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                    )
                })}
            </>}
        </div>
    )
}

export default FeaturedProperties