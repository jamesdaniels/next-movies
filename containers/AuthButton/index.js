import { useAuth, useSigninCheck } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const AuthButton = () => {
  const auth = useAuth();
  const { status, data } = useSigninCheck();
  if (status !== 'success') return (<span>&hellip;</span>);
  const { signedIn, user } = data;
  if (signedIn) {
    return (<button onClick={() => signOut(auth)}>Log out</button>);
  } else {
    return (<button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>Log in</button>);
  }
}

export default AuthButton;