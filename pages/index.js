import { useAuth } from '../lib/auth';

export default function Home() {
  const auth = useAuth();

  console.log(auth);

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={() => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={() => auth.signinWithGithub()}>Sign In</button>
  );
}
