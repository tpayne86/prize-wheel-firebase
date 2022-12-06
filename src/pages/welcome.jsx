import {useUser} from "../context/user.jsx";
import {Outlet} from "react-router-dom";
import {signInWithGooglePopup, signOutUser} from "../utils/firebase.js";

export function Welcome({children}) {
  const { currentUser, logIn, logOut } = useUser();
  console.log(currentUser);
  return (
    <div>
      <h1>Hello {currentUser?.displayName}</h1>
      {currentUser ? (<h2 onClick={() => {logOut()}}>Signout</h2>) : (<h2 onClick={() => {logIn()}}>SignIn</h2>)}
      <Outlet />
    </div>
  )
}
