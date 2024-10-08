import React from 'react';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import * as DappUI from '@multiversx/sdk-dapp/UI';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import routes from 'routes';
import { elrondNetwork } from 'config';
import UnlockRoute from 'pages/UnlockPage';

const environment = elrondNetwork;

const { TransactionsToastList, SignTransactionsModals, NotificationModal } =
  DappUI;

const App = () => {
  return (
    <Router>
      <DappProvider
        environment={environment}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout: 6000,
          walletConnectV2ProjectId: '371a8134ee4c3734058d1acc98a87d5c'
        }}
      >
        <Layout>
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className='custom-class-for-modals' />
          <Routes>
            <Route path={routeNames.unlock} element={<UnlockRoute />} />
            {routes.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </DappProvider>
    </Router>
  );
};

export default App;
