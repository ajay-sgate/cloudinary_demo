import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const [image, setImage] = useState();

  const handleFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);

    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((result) => setImage(result.data.secure_url))
      .catch((err) => console.log(err))


  }

  return (
    <>
      <div className='flex justify-center h-full bg-black'>
        <div className='w-1/3 bg-white my-6 p-6'>
          <input type='file' name='image' onChange={handleFile} />
        </div>
      </div>

      <div className='m-4'>
        <img className='rounded-full border' src={image} alt={image}/>
        <br/>
        <a href={image} target='_blank'>Image Link</a>
      </div>
    </>
  )
}

export default App
