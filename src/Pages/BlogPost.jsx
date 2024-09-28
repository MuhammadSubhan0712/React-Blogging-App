import React from 'react'

const BlogPost = () => {
  return (
  <>
  <div>

    <h1 className="text-4xl flex justify-center font-bold bg-white w-full p-2  mt-5">
    Dashboard
</h1>



{/*  Dashboard form  */}
<div className="w-full max-w-lg mt-5">
<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


{/*  Placeholder   */}
<div className="mb-4">

<input
  className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  type="text"
  placeholder="placeholder" />
</div>

{/*  Blog area  */}
<div className="mb-4">
<textarea className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="blog" placeholder="What is in your mind"/>
</div>


{/*  Publish Button  */}
<div className="flex items-center justify-start">
<button type="submit" className="btn btn-primary ">Publish Blog</button>
</div>
</form>
</div>
</div>
</>
  )
}

export default BlogPost