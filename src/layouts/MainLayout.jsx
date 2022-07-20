import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchModal from '../components/SearchModal'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
            <SearchModal />
        </div>
    )
}
