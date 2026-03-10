import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postContent } = useContext(PostContext);
  const { app } = useContext(FirebaseContext);



  useEffect(() => {
    const { userId } = postContent || {};
    if (!userId) return;

    const db = getFirestore(app);

    const q = query(collection(db, 'users'), where('id', '==', userId));

    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          setUserDetails(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [app, postContent]);

  return <div className="viewParentDiv">
    <div className="imageShowDiv">
      <img src={postContent.imageUrl} alt="" />
    </div>

    <div className="rightSection">
      <div className="productDetails">
        <p>&#x20B9; {postContent.price}</p>
        <span>{postContent.name}</span>
        <p>{postContent.category}</p>
        <span></span>
      </div>

      <div className="contactDetails">
        <p>Seller details</p>
        <p>{userDetails?.userName || 'No name'}</p>
        <p>{userDetails?.number || 'No phone'}</p>
      </div>
    </div>
  </div>;
}

export default View;