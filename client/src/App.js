import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
         <div className="fixed">
         <Navbar/>
         </div>
         <div style={{ paddingTop: '60px' }}>
          <Routes>
	        <Route path="/" exact Component={Landingscreen}/>
          <Route path="/home" exact Component={Homescreen}/>
          <Route path="/book/:roomid/:fromdate/:todate" exact Component={Bookingscreen} />
          <Route path="/register" exact Component={Registerscreen} />
          <Route path="/login" exact Component={Loginscreen} />
          <Route path="/profile" exact Component={Profilescreen}/>
          <Route path="/admin" exact Component={Adminscreen}/>
          {/* <Route path="*">
            <Redirect to="/home" />
          </Route> */}
          </Routes>
         </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
