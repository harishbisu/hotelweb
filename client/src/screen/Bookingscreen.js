import React, { useState, useEffect } from "react";
import axios from "axios";
import { json, useParams } from "react-router-dom";
import Error from '../components/Error';
import Footer from '../components/Footer';
import moment from "moment";
import Swal from 'sweetalert2';


function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();
  
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const token = JSON.parse(localStorage.getItem('token'));

  let { roomid,fromdate,todate } = useParams(); // Access the route parameter "roomid" using useParams() hook
  const firstdate=moment(fromdate,'DD-MM-YYYY');
  const lastdate=moment(todate,'DD-MM-YYYY');
  const totaldays=moment.duration(lastdate.diff(firstdate)).asDays()+1;
  const [totalamount, setTotalAmount]=useState();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if(!token){
          Swal.fire("Access Denied","Login again to renew Token",'error');
        }
        const data = (await axios.post("/api/rooms/getroombyid", { roomid }, config)).data; // Pass the "roomid" as a parameter to the API call
        setTotalAmount(data.rentperday*totaldays);
        // console.log(data);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]); // Add roomid as a dependency to the useEffect hook

 async function bookRoom() {
    const bookingDetails = {
          room,
          user_id : user._id,
          fromdate:fromdate,
          todate:todate,
          totalamount,
          totaldays
        }
        try {
          if(!token){
            Swal.fire("Access Denied","Login again to renew Token",'error');
          }
          const result = await axios.post('/api/bookings/bookroom',bookingDetails, config);
          if (result.status === 200) {
            Swal.fire("Congrats(*.*)","Your room has been booked.",'success').then(result=>{
              window.location.href='/profile';})
          }
          else{
            Swal.fire("Access Denied","Login again to renew Token",'error');
          }
          // if(result) {
          //   window.location.href='/profile'
          // }
        } catch (error) {
          console.log({error});
        }
  }


  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : room ?(
        <div>
          <div className="row justify-content-center bs m-2 mt-5">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <div><img src={room.imageurls[0]} className="bigimg" style={{width: '100%', height: '100%'}}/></div>
            </div>
            <div className="col-md-5">
              <div>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name : {user.name} </p>
                  <p>From Date :{fromdate} </p>
                  <p>To Date :{todate} </p>
                  <p>Max Count : {room.maxcount} </p>
                </b>
              </div>
              <div>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days : {totaldays}</p>
                  <p>Rent Per Day : Rupees {room.rentperday} Only</p>
                  <p>Total Amount : Rupees {totalamount} /-</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                
              <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>


              </div>
            </div>
          </div>
        </div>
      )
      :
       (
        <Error/>
      ) }
      <Footer/>
    </div>
  );
}

export default Bookingscreen;
