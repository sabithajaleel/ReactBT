import './App.less';
import { Provider } from 'react-redux';
import { UserProfileProvider } from './context/userProfileProvider';
import AppRoutes from './routes';
import { store } from './store';
import { SignalRProvider } from './context/signalRProvider';

function App() {
  return (
    <UserProfileProvider>
      <Provider store={store}>
        <SignalRProvider>
          <AppRoutes />
        </SignalRProvider>
      </Provider>
    </UserProfileProvider>
  );
}

export default App;
