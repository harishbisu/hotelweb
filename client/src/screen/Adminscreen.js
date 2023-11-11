import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import AddRooms from '../components/AddRooms';
import Footer from '../components/Footer';
import moment from 'moment';
const admin = process.env.PUBLIC_URL + "/admin.jpeg";


const Adminscreen = () => {
  const [activeTab, setActiveTab] = useState('1');
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setIsAdmin(currentUser.isAdmin);
        console.log(isAdmin);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchCurrentUser();
  }, []);





  return (
    <div>{isAdmin&&(<div>
      <div className="mt-3 ml-3 bs mr-3">
      <h2 className="text-left" style={{ fontSize: '30px' }}>
        Admin Panel
      </h2>
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rooms" key="2">
          <Rooms />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Room" key="3">
          <AddRooms />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="4">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
    </div>)}
    <div>
    {!isAdmin&&(
      <div>
        <img
                  src={admin}
                  alt=""
                /> 
            <h3 style={{padding:"5%"}}>...Don't miss use my project...</h3>
      </div>
    )}
    </div>
    <Footer/>
    </div>
  );
};

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
    headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await (await axios.get('/api/bookings/getallbookings',config)).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log({ error });
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <h1>Loading...</h1>}
        <table className="table table-bordered table-dark ">
            <thead className="bs">
                <tr>
                    <th>Booking Id</th>
                    <th>User Id</th>
                    <th>Room</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
  {bookings.length > 0 &&
    bookings.map((booking) => (
      <tr key={booking._id}>
        <td>{booking._id}</td>
        <td>{booking.user_id}</td>
        <td>{booking.room}</td>
        <td>{booking.fromdate}</td>
        <td>{booking.todate}</td>
        <td>{booking.status}</td>
      </tr>
    ))}
</tbody>
        </table>
        {bookings.length > 0 && <h1>There are a total of {bookings.length} bookings</h1>}
      </div>
    </div>
  );
}

export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const token1 = JSON.parse(localStorage.getItem('token'));
    const config1 = {
    headers: {
        'Authorization': `Bearer ${token1}`
      }
    };  
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          setLoading(true);
          const data = await (await axios.get('/api/rooms/getallrooms',config1)).data;
          setRooms(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log({ error });
        }
      };
      fetchRooms();
    }, []);
  
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Rooms</h1>
          {loading && <h1>Loading...</h1>}
          <table className="table table-bordered table-dark ">
              <thead className="bs">
                  <tr>
                      <th>Room Id</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Rent / Day</th>
                      <th>Max Count</th>
                      <th>Phone Number</th>
                  </tr>
              </thead>
              <tbody>
                  {rooms.length&&(rooms.map(room=>{
                      return <tr>
                          <td>{room._id}</td>
                          <td>{room.name}</td>
                          <td>{room.type}</td>
                          <td>{room.rentperday}</td>
                          <td>{room.maxcount}</td>
                          <td>{room.phonenumber}</td>
                      </tr>
                  }))}
              </tbody>
          </table>
          {rooms.length > 0 && <h1>There are a total of {rooms.length} rooms</h1>}
        </div>
      </div>
    );
  }



export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
    const token2 = JSON.parse(localStorage.getItem('token'));
    const config2 = {
    headers: {
        'Authorization': `Bearer ${token2}`
      }
    };
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const data = await (await axios.get('/api/users/getallusers',config2)).data;
          setUsers(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log({ error });
        }
      };
      fetchUsers();
    }, []);
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h1>Users</h1>
          {loading && <h1>Loading...</h1>}
          <table className="table table-bordered table-dark ">
              <thead className="bs">
                  <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Is Admin</th>
                  </tr>
              </thead>
              <tbody>
                  {users&&(users.map(user=>{
                      return <tr>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.isAdmin?'YES':'NO'}</td>
                      </tr>
                  }))}
              </tbody>
          </table>
          {users.length > 0 && <h1>There are a total of {users.length} users</h1>}
        </div>
      </div>
    );
  }

