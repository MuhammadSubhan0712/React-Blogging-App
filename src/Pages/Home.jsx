import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, loginUser } from '../config/Firebase/Methods'

const Home = () => {
  const navigate = useNavigate()
  let [CheckUser, setCheckUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCheckUser(true)

        return
      }
      setCheckUser(false)

    })
  }, [])
  return (
    <>

      <Navbar
        Login={!CheckUser ? 'Login' : ''}/>



    </>
  )
}
export default Home