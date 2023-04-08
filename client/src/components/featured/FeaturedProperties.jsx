import React from 'react';
import './featuredProperties.css';

const FeaturedProperties = () => {
  return (
    <div className='fp'>
        <div className='fpItem'>
            <img
                className='fpImg'
                src='https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1'
                alt=''
            />
            <span className='fpName'>Aparthotel Stare Miasto</span>
            <span className='fpCity'>London</span>
            <span className='fpPrice'>Starting from $120</span>
            <div className='fpRating'>
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className='fpItem'>
            <img
                className='fpImg'
                src='https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1'
                alt=''
            />
            <span className='fpName'>Aparthotel Stare Miasto</span>
            <span className='fpCity'>London</span>
            <span className='fpPrice'>Starting from $120</span>
            <div className='fpRating'>
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className='fpItem'>
            <img
                className='fpImg'
                src='https://imgs.search.brave.com/pYbr-DyqoHJi1te-xEDSkSlYNmVUOzVi4zyRiV4k9Cg/rs:fit:1080:675:1/g:ce/aHR0cHM6Ly9yaXZp/ZXJhYmFyY3Jhd2x0/b3Vycy5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTkvMDgv/aG90ZWxzLWluLW5p/Y2UtbGEtcGVyb3Vz/ZS0xMDgweDY3NS5q/cGc'
                alt=''
            />
            <span className='fpName'>Aparthotel Stare Miasto</span>
            <span className='fpCity'>London</span>
            <span className='fpPrice'>Starting from $120</span>
            <div className='fpRating'>
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className='fpItem'>
            <img
                className='fpImg'
                src='https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1'
                alt=''
            />
            <span className='fpName'>Aparthotel Stare Miasto</span>
            <span className='fpCity'>London</span>
            <span className='fpPrice'>Starting from $120</span>
            <div className='fpRating'>
                <button>8.9</button>

                <span>Excellent</span>
            </div>
        </div>
    </div>
  )
}

export default FeaturedProperties