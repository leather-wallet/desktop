import { Routes } from '../routes';
import { css, Global } from '@emotion/react';
import { color, CSSReset } from '@stacks/ui';
import { Store } from '@store/index';
import { loadFonts } from '@utils/load-fonts';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { useEffect, useState, createContext } from 'react';
import { hot } from 'react-hot-loader/root';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const GlobalStyle = css`
  html,
  body,
  #root {
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
    color: ${color('text-body')};
    border-color: ${color('border')};
  }

  #root {
    padding-top: 44px;
  }

  .draggable-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    width: 100%;
    box-shadow: 0px 1px 2px rgba(15, 17, 23, 0.08);
    -webkit-user-select: none;
    .inner-drag {
      -webkit-app-region: drag;
    }
  }
`;
interface RootProps {
  store: Store;
  history: History;
  persistor: any;
}

export interface BackContext {
  backUrl: null | string | (() => void);
  setBackUrl(url: null | string | (() => void)): void;
}

export const BackActionContext = createContext<BackContext>({
  backUrl: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBackUrl: (_url: string | (() => void)) => {},
});

function Root({ store, history, persistor }: RootProps) {
  const [backUrl, setBackUrl] = useState<string | (() => void) | null>(null);

  useEffect(() => void loadFonts(), []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BackActionContext.Provider value={{ backUrl, setBackUrl }}>
          <Global styles={GlobalStyle} />
          {CSSReset}
          <Toaster position="bottom-center" />
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </BackActionContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default hot(Root);
