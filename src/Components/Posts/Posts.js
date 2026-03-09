import React from 'react';
import { useState,useEffect,useContext } from 'react';
import Heart from '../../assets/Heart';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import './Post.css';
import {firebase, FirebaseContext} from '../../store/FirebaseContext'

function Posts() {

  const {firebase}=useContext(FirebaseContext)
  const[products,setProducts]=useState([])

  useEffect(() => {

    const fetchProducts = async () => {

      const snapshot = await getDocs(collection(db, "products"));

      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        };
      });

      console.log("all", allPost);
      setProducts(allPost);
    };

    fetchProducts();

  }, []);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {
            products.map((item)=>{
              return  <div
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={item.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{item.price} </p>
              <span className="kilometer">{item.category}</span>
              <p className="name"> {item.name}</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
            })
          }

         
          
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
