

import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generatePath, Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PRODUCT_CATEGORY_PATH, PRODUCT_PATH } from '../constants/path'
import { useCategories } from '../hooks/useCategories'
import { useData } from "../hooks/useData"
import productSerivce from "../services/product"
import { fetchCategories } from '../stores/product'



// 1. Lấy category render ra ở trang product list
// 2. Thêm category vào link để lấy ra danh sách sản phẩm cần thiết
// 3. Lấy sản phẩm ra đúng category
// 4. Lưu category vào global state cho drawer search sử dụng

const NavLinkRoot = styled(NavLink)`
    &.active{
        font-weight: bold
    }
`


export default function Category() {
    // const [categories, setCategories] = useState()
    // const [loading, setLoading] = useState(true)

    // const { categories, loadingCategory } = useSelector(store => store.product)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     // setLoading(true)
    //     // productSerivce.getCategories()
    //     //     .then(res => {
    //     //         setCategories(res)
    //     //         setLoading(false)
    //     //     })
    //     dispatch(fetchCategories())
    // }, [])

    const { categories, loadingCategory } = useCategories()


    return (
        <>
            <a className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6" data-toggle="collapse" href="#categoryCollapse">
                Category
            </a>
            {
                loadingCategory ? [...Array(10)].map((_, i) => <div key={i} style={{ marginBottom: 15 }}>
                    <Skeleton variant='rectangular' heigh={25} />
                </div>) : (
                    <div className="collapse show" id="categoryCollapse">
                        <div className="form-group">
                            <ul className="list-styled mb-0" id="productsNav">
                                <li className="list-styled-item">
                                    <NavLinkRoot className="list-styled-link" to={PRODUCT_PATH}>
                                        Tất cả sản phẩm
                                    </NavLinkRoot>
                                </li>
                                {
                                    categories.map(e => (
                                        <li key={e.id} className="list-styled-item">
                                            <NavLinkRoot className="list-styled-link" data-toggle="collapse" to={'/' + e.slug}>
                                                {e.title}
                                            </NavLinkRoot>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }

        </>
    )
}
