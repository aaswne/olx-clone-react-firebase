import React, { useState, useEffect } from 'react';
import Heart from '../../assets/Heart';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import './Post.css';

function Posts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      const snapshot = await getDocs(collection(db, "products"));

      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        };
      });

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

          {products.map((item) => (
            <div className="card" key={item.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={item.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{item.price}</p>
                <span className="kilometer">{item.category}</span>
                <p className="name">{item.name}</p>
              </div>
              <div className="date">
                <span>Tue May 04 2021</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Posts;