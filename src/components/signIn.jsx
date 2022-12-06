import {
  signInWithGooglePopup
} from '../utils/firebase.js'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  )
}

export default SignIn;
