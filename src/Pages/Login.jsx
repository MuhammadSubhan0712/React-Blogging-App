import React, { useRef } from 'react'

const Login = () => {

  const email = useRef();
  const password = useRef();

  
  return (
  
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