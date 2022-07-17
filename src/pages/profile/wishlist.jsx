import React, { useEffect, useState } from 'react'
import WishlistCard from '../../components/WishlistCard'
import Paginate from '../../components/Paginate'
import profileService from '../../services/profile'
import { useData } from '../../hooks/useData'
import { usePage } from '../../hooks/usePage'
import { Skeleton } from '@mui/material'

// 1. Gọi api wishlist khi click vào product 
// 2. Lấy list prod ở trang wishlist
// 3. Xóa product khỏi wishlist
// 4. Paginate
// 5. useData
// 6. Làm trạng thái Loading

export default function Wishlist() {
    // const [product, setProduct] = useState()
    // const [paginate, setPaginate] = useState()


    // useEffect(() => {
    //     profileService.getWishlist()
    //     .then(res => {
    //         setProduct(res.data)
    //         setPaginate(res.paginate)
    //     })
    // }, [])

    let currentPage = usePage()

    const { data: products, loading, paginate, fetchData } = useData(() => profileService.getWishlist(`?page=${currentPage}`), [currentPage])

    return (
        <>

            <div className="row">
                {
                    loading ? [...Array(9)].map((_, i) => <div className='col-md-4' key={i} style={{ marginBottom: 20 }}><Skeleton style={{ transform: 'none' }} width="100%" height={250} /></div>) :
                        products.map(e => <WishlistCard onRemove={fetchData} key={e._id} product={e.product} />)
                }
            </div>
            {/* Pagination */}
            {
                paginate && <Paginate totalPage={paginate.totalPage} />
            }
            {/* <nav className="d-flex justify-content-center justify-content-md-end">
                <ul className="pagination pagination-sm text-gray-400">
                    <li className="page-item">
                        <a className="page-link page-link-arrow" href="#">
                            <i className="fa fa-caret-left" />
                        </a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">4</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">5</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">6</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link page-link-arrow" href="#">
                            <i className="fa fa-caret-right" />
                        </a>
                    </li>
                </ul>
            </nav> */}
        </>
    )
}
