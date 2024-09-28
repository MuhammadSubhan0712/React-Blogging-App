import React from 'react'

export const Navbar = () => {
  return (
    <div>
   
    <div className=" bg-primary text-white w-full h-10 p-2 flex justify-around">
        <div className="">
          <a className="normal-case text-xl font-bold"
            >Personal Blogging App</a>
  
        </div>
        <div className="text-xl font-bold">
         <Link to="login">
         <button>Login</button>
         </Link>
        </div> 
      </div>
   
          <h1 className="text-4xl flex justify-center font-bold bg-white w-full p-2  mt-5">
              SignUp
          </h1>
    </div>
  )
}
