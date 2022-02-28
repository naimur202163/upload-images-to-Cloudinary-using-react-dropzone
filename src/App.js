import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
function App() {
  const [images,setImages]=useState([])
    function handleUpload(){
      console.log("Uploading Filess......")
    }
  const onDrop= useCallback((acceptedFiles,rejectedFiles)=>{
      console.log("acceptedFiles",acceptedFiles)
      acceptedFiles.forEach(file=>{
        const reader= new FileReader()
        reader.onload=()=>{
          setImages(prevState=>[...prevState,reader.result])
        }
        reader.readAsDataURL(file)
      })
      console.log("rejectedFiles",rejectedFiles)

  },[])
  const {getRootProps,getInputProps,isDragActive}=useDropzone({onDrop,
    accept: 'image/jpeg,image/png'
  });

  useEffect(()=>{
    console.log(images)
  },[images])
  console.log(getInputProps(),getRootProps())
  return (
    <div className="App">
        <div className='dropzone' {...getRootProps()}>
          <input {...getInputProps} />
          {isDragActive? "drageActive" :"You can drope your file"}
        </div>
        {images.length>0 && <div>
          {images.map((image,index)=><img className='selected-images' src={image} alt="" /> )}
          </div>}


          {images.length>0 && <button onClick={handleUpload}>Upload </button>}
    </div>
  );
}

export default App;
