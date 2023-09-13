import React, { Fragment , useContext, useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import {firebaseContext , AuthContext} from '../../store/firebaseContext'
import {useHistory} from 'react-router-dom'

const Create = () => {

  const history = useHistory()

  const {firebase} = useContext(firebaseContext)
  const {user} = useContext(AuthContext)

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)
  const date = new Date()

  const handleSubmit=()=>{
    if (image) {
      const allowedTypes = ['image/jpeg', 'image/webp' , 'image/jpg' , 'image/avif' , 'image/png']; // Allowed image file types
      const maxSize = 5 * 1024 * 1024; // Maximum file size in bytes (5MB)

      // Validate file type
      if (!allowedTypes.includes(image.type)) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size
      if (image.size > maxSize) {
        alert('Please select an image file smaller than 5MB');
        return;
      }

      // Perform upload and submit logic
      console.log('Image uploaded and submitted:', image);
        // Add your upload and submit logic here
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })

    } else {
      alert('Please select an image file');
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="fname" name="Price" />
            <br />
         
          <br />
          <img alt="Posts" width="300px" height="300px" src={image ? URL.createObjectURL(image) : ''}></img>

            <br />
            <input type="file" onChange={(e)=>{
              setImage(e.target.files[0])
            }} />
            <br />
            <button className="uploadBtn"  onClick={handleSubmit}>Upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
