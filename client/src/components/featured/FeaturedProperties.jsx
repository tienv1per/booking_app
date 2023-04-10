import React from 'react';
import './featuredProperties.css';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
    const {data, loading, error} = useFetch("hotels?featured=true");

    const images = [
        "https://imgs.search.brave.com/okLyHvoZwU30AXbZZRmcTLEhp6DCjG0hJZwYy0EIyi8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzIwLzA3/L2Q2LzIwMDdkNmRk/NGNhOGY0YjUyN2Qx/OWM3YmFhZWZhYjdl/LmpwZw",
        "https://imgs.search.brave.com/fbkc65KBo4sVapHL7coxWAZGtgFHtn9_cGHU_9DX2R8/rs:fit:1200:1013:1/g:ce/aHR0cHM6Ly8xNXBp/Y3R1cmVzLmNvbS93/cC1jb250ZW50L2dh/bGxlcnkvMTUtcGlj/dHVyZXMtaG90ZWxz/L2hvdGVscy0xMi5q/cGc",
        "https://imgs.search.brave.com/74fJspmzgxto6gYBWmQMwaYrO9o0U4y-zVMKbCx1QUw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4NDYw/NzAuanBn",
        "https://imgs.search.brave.com/5e0pAgR8lIZdT7Rlpy8qQ0hpeYBVgSqW9vfbN1V9LRo/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDM4MDQw/LmpwZw",
        "https://imgs.search.brave.com/MegwA3aTbQElGK-qruDo8T8T0lQpnCtCi9bUfHQu5R4/rs:fit:1200:923:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4NDYw/OTEuanBn",
        "https://imgs.search.brave.com/OHv4SYBnvYjPqXwlfIaOSSiOC5PLEjhxj2oosfNa9Pg/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxw/YXBlcmNhdmUuY29t/L3dwL3dwMTg0NjA2/OC5qcGc",
        "https://imgs.search.brave.com/dB1hkuIKItWwrJmQrtfstYely0C5Wevz-cf_v4_Kxec/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJpcHNhdnZ5LmNv/bS90aG1iL1RNNzlN/RkdDcGRxdnBTVjV4/eGlxNDV3UG5wST0v/MjEyMXgxNDE0L2Zp/bHRlcnM6bm9fdXBz/Y2FsZSgpOm1heF9i/eXRlcygxNTAwMDAp/OnN0cmlwX2ljYygp/L0dldHR5SW1hZ2Vz/LTE0ODYzNjQyNS01/YTFhNzI0ZjdkNGJl/ODAwMTkzZmQ1ZjMu/anBn"
    ]
    console.log(data);

    return (
        <div className='fp'>
            {loading ? "Loading please wait" : <>
                {data.map((item, index) => {
                    return (
                        <div className='fpItem' key={index}>
                            <img
                                className='fpImg'
                                src={images[index]}
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