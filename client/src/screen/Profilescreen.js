import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Tabs } from "antd";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Footer from "../components/Footer";
import GiveRating from "../components/GiveRating";
import { Divider, Space, Tag } from "antd";



const Profilescreen = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [inputvalue,setInputValue]=useState('');
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const [show, setShow] = useState(true);

  const togglePasswordChange = () => {
    setShow(!show);
  };


  const  handleSave = async() => {
    try{
      const result=axios.post('/api/users/changename',{userid:user._id,newname:inputvalue});
      if(result.status === 201){
        setShow(!show);
        Swal.fire("Congrats", "Your name has been updated", "success")
      }
    }catch(e){
      console.log(e);
    }
  };

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "/login";
  }

  return (
    <div>
      <div className="ml-3">
        <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
          <Tabs.TabPane
            tab={
              <div className="tab-heading">
                <h1 className="text-left ">Profile</h1>
              </div>
            }
            key="1"
          >
            <div className="fixed-tab-pane">
              <div
                className="tab-content mt-3 text-left col-md-6 "
                style={{ marginBottom: "20vh" }}
              >
                <table className="user-table">
                  <tbody>
                    <tr>
                      <td>
                        <h1>Name:</h1>
                      </td>
                      <td>
                        {show ? (
                          <h1>{user.name}</h1>
                        ) : (
                            <form >
                              <input className="form-control" type="text" placeholder={user.name} value={inputvalue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}></input>
                              <button className="btn btn-primary" style={{marginTop:"5px"}} onClick={handleSave}>save</button>
                              <button className="btn btn-primary" style={{marginTop:"5px",marginLeft:"5px"}}onClick={togglePasswordChange}>cancel</button>
                              </form>
                        )}
                        
                      </td>
                      <td>
                        {show ? (
                          <a href="#" onClick={togglePasswordChange}>Edit</a>
                        ) : (
                          <></>
                        )}
                        
                      </td>
                      <td>{/* <h1><a href="">Edit</a></h1> */}</td>
                    </tr>
                    <tr>
                      <td>
                        <h1>Email:</h1>
                      </td>
                      <td>
                        <h1>{user.email}</h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1>Password:</h1>
                      </td>
                      <td>
                        <h1>*******</h1>
                      </td>
                      <td>
                        <a href="#">edit</a>
                      </td>
                      <td>{/* <h1><a href="">Edit</a></h1> */}</td>
                    </tr>
                    <tr>
                      <td>
                        <h1>Admin:</h1>
                      </td>
                      <td>
                        <h1>
                          {user.isAdmin ? (
                            <a href="/admin">
                              <Tag color="green">Approved</Tag>
                            </a>
                          ) : (
                            <Tag color="red">Denied</Tag>
                          )}
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div className="tab-heading">
                <h1 className="text-left ">Bookings</h1>
              </div>
            }
            key="2"
          >
            <div className="tab-content">
              <MyBookings />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const token2 = JSON.parse(localStorage.getItem("token"));
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await (
          await axios.post(
            "/api/bookings/getbookingbyuserid",
            {
              userid: user._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token2}`,
              },
            }
          )
        ).data;
        setLoading(false);
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [user._id]);
  async function cancelBooking(bookingid, roomid) {
    const token2 = JSON.parse(localStorage.getItem("token"));
    try {
      setLoading(true);
      const result = await (
        await axios.post(
          "/api/bookings/cancelBooking",
          { bookingid, roomid },
          {
            headers: {
              Authorization: `Bearer ${token2}`,
            },
          }
        )
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Your booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
      // if(result){
      //   window.location.reload();
      // }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
      Swal.fire("Oops !!!", "Something went wrong.", "error");
    }
  }

  return (
    <div>
      {loading && <Loader style={{ align: "center" }} />}
      {error && <Error />}
      <div className="row">
        <div className="col-md-6">
          {bookings &&
            bookings.map((booking) => {
              const fromDate = booking.fromdate;
              const currentDate = moment().format("DD-MM-YYYY");
              const isCancelable = moment(fromDate, "DD-MM-YYYY").isAfter(
                moment(currentDate, "DD-MM-YYYY")
              );

              return (
                <div className="bs text-left">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId :</b> {booking._id}
                  </p>
                  <p>
                    <b>Check IN :</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>Check Out : </b>
                    {booking.todate}
                  </p>
                  <p>
                    <b>Amount Paid :</b> {booking.totalamount}/-
                  </p>
                  <p>
                    <b>Status :</b>{" "}
                    {booking.status === "booked" ? (
                      <Tag color="green">Confirmed</Tag>
                    ) : (
                      <Tag color="red">Cancelled</Tag>
                    )}
                    <p>
                      <GiveRating
                        roomId={booking.roomid}
                        previousRating={booking.rating}
                        bookingId={booking._id}
                      ></GiveRating>
                    </p>
                    {booking.status === "booked" && isCancelable && (
                      <div className="text-right">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomid);
                          }}
                        >
                          {" "}
                          CANCEL BOOKING
                        </button>
                      </div>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
