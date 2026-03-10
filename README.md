# OLX Clone (React + Firebase)

A fully functional **OLX-style marketplace web application** built using **React and Firebase**.  
Users can **sign up, log in, post products, and browse items** posted by others.

This project replicates the core functionality of OLX and demonstrates **React state management, Firebase integration, and routing**.

---

# 🚀 Features

- User Authentication (Firebase Auth)
- Post Products
- View Product Listings
- Product Detail Page
- Firebase Firestore Database
- React Context API for state management
- Responsive UI
- Smooth horizontal card scrolling
- Protected routes

---

# 🛠 Tech Stack

### Frontend
- React
- CSS
- React Router DOM

### Backend / Database
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

---

# 📁 Project Structure

```
src
│
├── Components
│   ├── Banner
│   ├── Footer
│   ├── Header
│   ├── Posts
│   └── View
│
├── Pages
│   ├── Home
│   ├── Login
│   ├── Signup
│   ├── Sell
│   └── ViewPost
│
├── store
│   ├── FirebaseContext.js
│   └── PostContext.js
│
├── firebase
│   └── config.js
│
└── App.js
```

---

# ⚙️ How the App Works

## Authentication

Users can:

- Sign Up
- Login
- Logout

Firebase Authentication manages user accounts.

Context API stores the logged-in user globally.

```
AuthContext
```

This allows any component to access user information.

---

## 📝 Posting a Product

When a user clicks **Sell**, they can upload:

- Product Name
- Category
- Price
- Image

Steps:

1. Image uploads to **Firebase Storage**
2. Product data saves in **Firestore**
3. The product appears on the home page.

Firestore collection used:

```
products
```

Example document:

```
{
  name: "iPhone 13",
  price: "50000",
  category: "Mobiles",
  imageUrl: "firebase-image-url",
  userId: "user-id"
}
```

---

## 🛒 Viewing Products

On the home page the **Posts component** fetches products from Firestore.

Example:

```javascript
getDocs(collection(db,"products"))
```

The products are mapped into product cards.

---

## 👁 View Product Page

When a product card is clicked:

```javascript
setPostContent(item)
history.push('/view')
```

The selected product is stored in **PostContext** and displayed on the **View page**.

---

# 💻 Installation

Clone the repository

```
git clone https://github.com/yourusername/olx-clone.git
```

Move into the project folder

```
cd olx-clone
```

Install dependencies

```
npm install
```

Run the project

```
npm start
```

The app will run at:

```
http://localhost:3000
```

---

# 🔥 Firebase Setup

1. Go to Firebase Console  
https://console.firebase.google.com/

2. Create a new project

3. Enable the following services:

- Authentication (Email/Password)
- Firestore Database
- Storage

4. Create the Firebase configuration file:

```
src/firebase/config.js
```

Example configuration:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

---

# 🧠 Context API

Two contexts are used in this project.

## AuthContext

Stores the logged-in user.

```
AuthContext
```

Used for:

- authentication state
- accessing user information
- protecting routes

---

## PostContext

Stores the selected product when a user clicks a product card.

```
PostContext
```

Used for:

- passing product data to the product view page

---

# 🔮 Future Improvements

- Search functionality
- Filter products by category
- User profile page
- Edit / Delete product
- Chat between buyer and seller
- Wishlist system
- Pagination

---

# 👨‍💻 Author

**Aswin Krishna**

BCA Graduate  
Aspiring Software Developer  
Learning React, AI & Machine Learning

---

# 📜 License

This project is created for **learning and educational purposes**.