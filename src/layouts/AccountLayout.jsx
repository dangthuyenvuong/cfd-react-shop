import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AUTH_PATH, HOME_PATH } from '../constants/path'
import { logoutAction } from '../stores/user'

export default function AccountLayout() {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const onLogout = (ev) => {
        ev.preventDefault()
        dispatch(logoutAction())

    }

    if(!user) return <Navigate to={AUTH_PATH}/>

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-10">My Account</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        {/* Nav */}
                        <nav className="mb-10 mb-md-0">
                            <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                                <a className="list-group-item list-group-item-action dropright-toggle " href="account-orders.html">
                                    Orders
                                </a>
                                <a className="list-group-item list-group-item-action dropright-toggle " href="account-wishlist.html">
                                    Widhlist
                                </a>
                                <a className="list-group-item list-group-item-action dropright-toggle active" href="account-personal-info.html">
                                    Personal Info
                                </a>
                                <a className="list-group-item list-group-item-action dropright-toggle " href="account-address.html">
                                    Addresses
                                </a>
                                <a className="list-group-item list-group-item-action dropright-toggle " href="account-payment.html">
                                    Payment Methods
                                </a>
                                <a onClick={onLogout} className="list-group-item list-group-item-action dropright-toggle" href="#!">
                                    Logout
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    )
}
