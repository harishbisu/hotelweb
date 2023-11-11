import React from 'react';
import {Link } from 'react-router-dom';

function Landingscreen() {
    return (
        <div className="row landing " style={{position:'fixed'}} >
            <div className="col-md-5 my-auto justify-content-centre" style={{borderRight:"8px solid white"}}>
                <h3 style={{color: 'white',fontSize: '100px',fontWeight:'normal'}}>Hotel Web</h3>
                <h1 style={{color: 'white',fontWeight:'normal'}}>Find YOUR Destination here...</h1> 
                <Link to="/home">
                    <button className="btn btn-primary landingbtn" style={{color:'black'}}>Get Started</button>
                </Link>
            </div>
            <div className="col-md-5 my-auto " style={{borderRight:"8px solid white"}}>
                 <h3 style={{color: 'white',fontSize: '80px',fontWeight:'normal'}}>Welcome</h3>
                 <h1 style={{color: 'white',fontWeight:'normal'}}>"Choose a room that fills your heart with joy, for it will be your haven and sanctuary."</h1>
                 <p style={{color: 'white',fontWeight:'inherit',float:'right'}}> - Indian Proverb</p>
            </div>
        </div>
    )
}

export default Landingscreen;