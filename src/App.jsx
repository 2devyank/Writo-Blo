import { BrowserRouter,Route ,Routes, useLocation} from 'react-router-dom';
import Navb from './components/Navb';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';

function App() {
  
// const location=useLocation();
// console.log(location)
  return (
   <BrowserRouter>
   
    
    
   <Navb/>
   <div>
     <Routes>
       <Route  path="/" element={<Home/>} />
       <Route  path="/login" element={<Login/>} />
       {/* <Route  path="/post" element={<Post/>} /> */}
       <Route  path="/create" element={<CreatePost/>} />
       <Route  path="/profile" element={<Profile/>} />
       <Route  path="/:name" element={<SinglePost/>} />
     </Routes>
   </div>
   
   </BrowserRouter>
  )
}

export default App
