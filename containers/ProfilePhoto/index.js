import Link from 'next/link';
import { useSigninCheck } from 'reactfire';

const ProfilePhoto = ({ size }) => {
  const { status, data } = useSigninCheck();
  if (status !== 'success') return (<span>&hellip;</span>);
  const { signedIn, user } = data;
  if (signedIn) {
    return (<>
        <Link href='/profile'>
            <img src={user.photoURL} width={size} height={size} />
        </Link>
        <style jsx>{`img { border-radius: 50%; }`}</style>
    </>);
  } else {
    return (<></>);
  }
}

export default ProfilePhoto;