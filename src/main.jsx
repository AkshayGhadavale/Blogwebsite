import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loginpage from './pages/Loginpage.jsx'
import Signuppage from './pages/Signuppage.jsx'
import Allpost from './pages/Allpost.jsx'
import Editpost from './pages/Editpost.jsx'
import Addpost from './pages/Addpost.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
import Authlayout from "./Componnets/Authlayout.jsx"

const router = createBrowserRouter([
  
  {
path:'/',
element:<App/>,
children:[
  {
    path: "/",
    element: <Home />,
},
{
  path:"/Login",
  element:(<Authlayout authentication={false}><Loginpage/></Authlayout>)
}
,
{
  path: "/signup",
  element: (
      <Authlayout authentication={false}>
          <Signuppage />
      </Authlayout>
  ),
},
{
  path: "/all-posts",
  element: (
      <Authlayout authentication>
          {" "}
          <Allpost />
      </Authlayout>
  ),
},
{
  path: "/add-post",
  element: (
      <Authlayout authentication>
          {" "}
          <Addpost />
      </Authlayout>
  ),
},
{
  path: "/edit-post/:slug",
  element: (
      <Authlayout authentication>
          {" "}
         <Editpost/>
      </Authlayout>
  ),
},
{
  path: "/post/:slug",
  element: <Post />,
},
]



}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router}></RouterProvider>
  </Provider>,
)
