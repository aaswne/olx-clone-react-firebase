import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import {  AuthContext } from "../../store/FirebaseContext";

const Create = () => {
  const { user } = useContext(AuthContext);


  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleClick = async () => {
    try {
      console.log("button clicked");

      if (!image) {
        alert("Please select an image or file");
        return;
      }

      const imageRef = ref(storage, `images/${image.name}`);

      console.log("Uploading image...");
      await uploadBytes(imageRef, image);

      console.log("Getting download URL...");
      const url = await getDownloadURL(imageRef);

      console.log("Saving product to Firestore...");
      await addDoc(collection(db, "products"), {
        name: name,
        category: category,
        price: price,
        imageUrl: url,
        userId:user.uid,
        createdAt: new Date(),
      });

      console.log("Product added successfully");
      alert("Product added successfully");

      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.log("Upload error:", error);
      alert(error.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          id="fname"
          name="Name"
        />
        <br />

        <label htmlFor="category">Category</label>
        <br />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          type="text"
          id="category"
          name="category"
        />
        <br />

        <label htmlFor="price">Price</label>
        <br />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
          type="number"
          id="price"
          name="Price"
        />
        <br />
        <br />

        {image && (
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}

        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleClick} className="uploadBtn">
          upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;