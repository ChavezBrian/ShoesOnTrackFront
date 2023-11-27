import { Provider } from 'react-redux';
import store from '@/redux/store';
import HomePage from './page';
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <Provider store={store}>
      <HomePage />
    </Provider>
     </UserProvider>
  );
}

export default MyApp;