import React from 'react';
import './featured.css';
import useFetch from '../../hooks/useFetch';

const Featured = () => {
    const {data, loading, error} = useFetch("hotels/countByCity?cities=Barcelona,New York,Paris");
  return (
    <div className='featured'>
        {loading ? "Loading please wait" : <><div className='featuredItem'>
            <img 
                src='https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=' 
                alt=''
            />
            <div className='featuredTitles'>
                <h1>Barcelona</h1>
                <h1>{data[0]} properties</h1>
            </div>
        </div>
        <div className='featuredItem'>
            <img 
                src='https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=' 
                alt=''
            />
            <div className='featuredTitles'>
                <h1>New York</h1>
                <h1>{data[1]} properties</h1>
            </div>
        </div>
        <div className='featuredItem'>
            <img 
                src='https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=' 
                alt=''
            />
            <div className='featuredTitles'>
                <h1>Paris</h1>
                <h1>{data[2]} properties</h1>
            </div>
        </div></>}
    </div>
  )
}

export default Featured;