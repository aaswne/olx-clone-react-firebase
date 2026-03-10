import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { AuthContext } from "./store/FirebaseContext";
import Post from "./store/postContext";

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("App user:", user);
  }, [user]);

  return (
    <Post>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Create" component={Create}  />
          <Route exact path="/View" component={View} />
        </Switch>
      </Router>
    </Post>
  );
}

export default App;
