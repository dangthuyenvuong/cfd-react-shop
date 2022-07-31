import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GlobalStateProvider } from './hooks/useGlobalState'
import store from './stores'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .swiper-pagination-bullet-active{
    background: #ff6f61;
  }
`


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle />
    <BrowserRouter>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
