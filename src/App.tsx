import React from "react";
import "./App.css";
import firebase from "firebase";
import withFirebaseAuth, {
  WrappedComponentProps,
} from "react-with-firebase-auth";
import { Layout } from "antd";
import LoggedIn from "./components/LoggedIn";
import TopNav from "./components/TopNav";
import LoggedOut from "./components/LoggedOut";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBy3Y5w0kfsAp12rfG_XXA6CHhe80TjYrg",
  authDomain: "food-delivery-f8fe1.firebaseapp.com",
  projectId: "food-delivery-f8fe1",
  storageBucket: "food-delivery-f8fe1.appspot.com",
  messagingSenderId: "453622329220",
  appId: "1:453622329220:web:ca118c3225633b824337d1",
});

export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App: React.ComponentType<object & WrappedComponentProps> = ({
  user,
  signOut,
  signInWithGoogle,
}) => (
  <div className="App">
    <TopNav user={user} signOut={signOut} />
    <Layout.Content className="h-screen p-8">
      {user ? (
        <LoggedIn user={user} />
      ) : (
        <LoggedOut signInWithGoogle={signInWithGoogle} />
      )}
    </Layout.Content>
  </div>
);

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
