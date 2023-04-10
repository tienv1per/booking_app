import React from 'react';
import './PropertyList.css';
import useFetch from '../../hooks/useFetch';
const images = require('../../public/images');

const PropertyList = () => {
    const {data, loading, error} = useFetch("http://localhost:8000/api/hotels/countByType");
    const dataImage = images.images;
    
    return (
        <div className='pList'>
            {loading ? "Loading please wait" : data.map((dataHotel, index) => {
                return (
                    <div className='pListItem' key={index}>
                        <img 
                            className='pListImg'
                            src={dataImage[index]}
                            alt=''
                        />
                        <div className='pListTitles'>
                            <h1>{dataHotel?.type}</h1>
                            <h2>{dataHotel?.count} {dataHotel?.type}</h2>
                        </div>
                    </div>
                )  
            })}    
        </div>
    )
}

export default PropertyList