

import { Provider } from 'react-redux';
import globalStyles from 'styles/global';
import React from 'react';
import { useStore } from 'store';
import ThemeProvider from 'utils/hocs/ThemeProvider';
import Layout from 'parts/Layout';
import getConfig from 'next/config';
import { AuthProvider, FirebaseAppProvider } from 'reactfire';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

const { publicRuntimeConfig: { firebaseConfig } } = getConfig();

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const router = useRouter();
  React.useEffect(() => {
    let wasLoggedOut = false;
    onAuthStateChanged(auth, user => {
      const getIdToken = user ? user.getIdToken() : Promise.resolve(null);
      getIdToken.then(idToken => fetch('/__next/cookie', {
        method: 'POST',
        body: JSON.stringify({ user: idToken ? { idToken } : null }),
        headers: { 'Content-Type': 'application/json' }
      })).then(() => {
        if (user) {
          if (wasLoggedOut) router.push('/profile');
          wasLoggedOut = false;
        } else {
          wasLoggedOut = true;
          if (window.location.pathname === '/profile') router.push('/');
        }
      });
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <AuthProvider sdk={auth}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </FirebaseAppProvider>
        </ThemeProvider>
      </Provider>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};

export default MyApp;
