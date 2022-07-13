import { Routes, Route } from 'react-router-dom'
import { ACCOUNT_PATH, ACCOUNT_WISHLIST_PATH, AUTH_PATH, PRODUCT_DETAIL_PATH, PRODUCT_PATH } from './constants/path'
import AccountLayout from './layouts/AccountLayout'
import MainLayout from './layouts/MainLayout'
import Home from './pages'
import Auth from './pages/auth'
import Shop from './pages/product'
import Profile from './pages/profile'
import Wishlist from './pages/profile/wishlist'
import ProductDetail from './pages/product/[slug]'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={PRODUCT_PATH} element={<Shop />} />
        <Route path={PRODUCT_DETAIL_PATH} element={<ProductDetail />} />
        <Route path={AUTH_PATH} element={<Auth />} />
        <Route path={ACCOUNT_PATH} element={<AccountLayout />}>
          <Route index element={<Profile />} />
          <Route path={ACCOUNT_WISHLIST_PATH} element={<Wishlist />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
