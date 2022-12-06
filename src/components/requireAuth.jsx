import {useUser} from "../context/user.jsx";
import {Navigate, useLocation} from "react-router-dom";

export function RequireAuth({children}) {
  let {currentUser} = useUser();
  let location = useLocation();
  console.log(currentUser);
  if(!currentUser) {
    return '';
  }

  return children;
}
