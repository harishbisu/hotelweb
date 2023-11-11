import React, { useState } from 'react';
import axios from 'axios';


const AddRooms = () => {
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState();
  const [description,setDescription] = useState();
  const [roomRent, setRoomRent] = useState();
  const [roomMaxCount, setRoomMaxCount] = useState();
  const [roomPhoneNumber, setRoomPhoneNumber] = useState();
  const [image1 , setImage1] = useState();
  const [image2 , setImage2] = useState();
  const [image3 ,setImage3] =useState();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));
    const config = {
    headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  const handleAddRoom = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/rooms/addroom', {
        name: roomName,
        type: roomType,
        description:description,
        rentperday: roomRent,
        maxcount: roomMaxCount,
        phonenumber: roomPhoneNumber,
        imageurls:[image1,image2,image3]
      },config);
      // Handle success, such as showing a success message or resetting form fields
      console.log('Room added successfully:', response.data);
      setLoading(false);
      setRoomName('');
      setRoomType('');
      setRoomRent('');
      setRoomMaxCount('');
      setRoomPhoneNumber('');
      setDescription('');
      setImage1('');
      setImage2('');
      setImage3('');
    } catch (error) {
      setLoading(false);
      // Handle error, such as showing an error message
      console.error('Failed to add room:', error);
    }
  };

  return (
    <div> 
    <div className='row'>
    <div className='col-md-5'>
      <input type="text" className="form-control mt-2" placeholder="Room Name" value={roomName} onChange={(e)=>{setRoomName(e.target.value)}}/>
      <input type="text" className="form-control mt-2" placeholder="Rant per Day" value={roomRent} onChange={(e)=>{setRoomRent(e.target.value)}}/>
      <input type="text" className="form-control mt-2" placeholder="Max count" value={roomMaxCount} onChange={(e)=>{setRoomMaxCount(e.target.value)}}/>
      <input type="text" className="form-control mt-2" placeholder="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <input type="text" className="form-control mt-2" placeholder="Phone No" value={roomPhoneNumber} onChange={(e)=>{setRoomPhoneNumber(e.target.value)}}/>
    </div>
    <div className="col-md-5">
      
      <input type="text" className="form-control mt-2" placeholder="Type" value={roomType} onChange={(e)=>{setRoomType(e.target.value)}}/>
      <input type="text" className="form-control mt-2" placeholder="Image URL-1" value={image1} onChange={(e)=>{setImage1(e.target.value)}}/>
      <input type="text" className="form-control mt-2" placeholder="Image URL-2" value={image2} onChange={(e)=>{setImage2(e.target.value)}}/>
      <input type="text" className="form-control mt-2 " placeholder="Image URL -3" value={image3} onChange={(e)=>{setImage3(e.target.value)}}/>
      <button className="btn btn-primary mt-2" style={{float:'right'}} onClick={handleAddRoom}>ADD ROOM</button>
    </div>
  </div>
    </div>
  );
};

export default AddRooms;
