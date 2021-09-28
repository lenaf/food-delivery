import React from "react";
import "./App.css";
import firebase from "firebase";
import withFirebaseAuth, {
  WrappedComponentProps,
} from "react-with-firebase-auth";
import { Layout, Spin } from "antd";
import Home from "./components/Home";
import AccountPage from "./components/user/AccountPage";
import Welcome from "./components/Welcome";
import RestaurantPage from "./components/restaurant/RestaurantPage";
import TopNav from "./components/TopNav";
import LoggedOut from "./components/LoggedOut";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useFetchUser } from "./hooks/user";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBy3Y5w0kfsAp12rfG_XXA6CHhe80TjYrg",
  authDomain: "food-delivery-f8fe1.firebaseapp.com",
  projectId: "food-delivery-f8fe1",
  storageBucket: "food-delivery-f8fe1.appspot.com",
  messagingSenderId: "453622329220",
  appId: "1:453622329220:web:ca118c3225633b824337d1",
  databaseURL: "https://food-delivery-f8fe1.firebaseio.com",
});

export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App: React.ComponentType<object & WrappedComponentProps> = ({
  user: firebaseUser,
  signOut,
  signInWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  error,
  loading,
}) => {
  const { user, loading: fetchUserLoading } = useFetchUser(
    firebaseUser?.uid ?? ""
  );
  return (
    <Router>
      <div className="App">
        <TopNav user={user} signOut={signOut} />
        <Layout.Content className="h-screen p-8 bg-gray-50">
          {user ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={AccountPage} />
              <Route
                path="/restaurant/:restaurantId"
                component={RestaurantPage}
              />
            </Switch>
          ) : fetchUserLoading ? (
            <Spin />
          ) : firebaseUser ? (
            <Welcome firebaseUser={firebaseUser} />
          ) : (
            <LoggedOut
              signInWithGoogle={signInWithGoogle}
              createUserWithEmailAndPassword={createUserWithEmailAndPassword}
              signInWithEmailAndPassword={signInWithEmailAndPassword}
              error={error}
              loading={loading}
            />
          )}
        </Layout.Content>
      </div>
    </Router>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
