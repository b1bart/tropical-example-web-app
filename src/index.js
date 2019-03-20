import React from 'react'
import ReactDOM from 'react-dom'

// UAL Required Imports
import { UALProvider } from '@blockone/ual-reactjs-renderer'
// Authenticator Imports
import { EOSIOAuth } from '@blockone/ual-eosio-reference-authenticator'
import { Scatter } from '@blockone/ual-scatter'
import { Lynx } from '@blockone/ual-lynx'
import { TokenPocket } from '@blockone/ual-token-pocket'

import 'focus-visible/dist/focus-visible.min.js'
import 'index.scss'
import 'assets/styles/constants.scss'

import App from './App'
import * as serviceWorker from './serviceWorker'

const appName = 'Tropical Example'

// Chains
const chain = {
  chainId: process.env.REACT_APP_CHAIN_ID,
  rpcEndpoints: [
    {
      protocol: process.env.REACT_APP_RPC_PROTOCOL,
      host: process.env.REACT_APP_RPC_HOST,
      port: process.env.REACT_APP_RPC_PORT,
    },
  ],
}

// Authenticators
const eosioAuth = new EOSIOAuth([chain], { appName })
const scatter = new Scatter([chain], { appName })
const lynx = new Lynx([chain])
const tokenPocket = new TokenPocket([chain])

const supportedChains = [chain]
const supportedAuthenticators = [scatter, lynx, tokenPocket]

ReactDOM.render(
  <UALProvider chains={supportedChains} authenticators={supportedAuthenticators} appName={appName}>
    <App />
  </UALProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()