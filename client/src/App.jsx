import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import Post from './pages/Post'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/about' element={<About/>}  />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/search' element={<Search />} />
        <Route path='/post/:postSlug' element={<Post />} />
        <Route path='/projects' element={<Projects/>}  />
        <Route path='/sign-in' element={<SignIn/>}  />
        <Route path='/sign-up' element={<SignUp/>}  />
      </Routes>
      <Toaster />
      <FooterCom />
    </BrowserRouter>
  )
}

export default App
