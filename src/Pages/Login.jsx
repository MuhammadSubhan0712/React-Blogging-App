import React, { useRef } from 'react'

const Login = () => {

  const email = useRef();
  const password = useRef();

  
  return (

    <div className='bg-base-300 flex flex-col h-screen'> 
        
    <div className=" bg-primary text-white w-full h-10 p-2 flex justify-around">
      <div className="">
        <a className="normal-case text-xl font-bold"
          >Personal Blogging App</a>

      </div>
      <div className="text-xl font-bold">
       <button><a href="./register.html">SignUp</a></button>
      </div> 
    </div>
 
        <h1 className="text-4xl flex justify-center font-bold bg-white w-full p-2  mt-5">
            Login
        </h1>

    {/*  --------------------------------------------------------------- }

    {/* login  Form  */}
  
    <div className="flex-grow flex items-center justify-center w-full">
      <div className="w-full max-w-xs">
        <form id="form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


          {/*  For Email  */}

          <div className="mb-4">
        
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your Email" ref={email}/>
          </div>

        
          {/*  For Password  */}

          <div className="mb-6">

            <input
              id="password"
              type="password"
              className="input input-bordered w-full mb-3"
              placeholder="Enter your Password" ref={password}/>
          </div>

           {/* Login Button  */}

          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

        </form>
      </div>
    </div>
</div>
  )
}

export default Login