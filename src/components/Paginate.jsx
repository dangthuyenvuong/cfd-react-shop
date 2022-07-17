import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePage } from '../hooks/usePage'
import { useSearchValue } from '../hooks/useSearchValue'

// 1. Giới thiệu paginate là gì ?
// 2. Yêu cầu của component ?
//     1. Thay đổi search param trên url để đảm bảo refresh trang không bị mất page hiện tại
//     2. Gắn thêm sự kiện onChange để khi sử dụng có thể add các logic cần thiết
//     3. Có thể custom được tên của search param (mặc định là “page”) để tránh lỗi khi sử dụng 2 paginate trên cùng 1 page
// 3. Prop và value khác?
//     1. totalPage: Thể hiện tổng số trang được render ra
//     2. currentPage: Được lấy từ search query mặc định là “page” trên url

export default function Paginate({ totalPage, onChange, name = 'page' }) {
    let currentPage = usePage(name)
    const searchParam = useSearchValue()

    useEffect(() => {
        onChange?.(currentPage)
    }, [currentPage])

    const renderPage = () => {
        if (totalPage <= 1) return null

        let start = currentPage - 2,
            end = currentPage + 2

        if (start < 1) {
            start = 1

            if (totalPage > 5) {
                end = 5
            } else {
                end = totalPage
            }
        }

        if (end > totalPage) {
            end = totalPage
            start = end - 4

            if(start < 0) start = 1
        }


        const list = []
        for (let i = start; i <= end; i++) {
            searchParam.set(name, i)
            const path = searchParam.toString()

            list.push(<li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <Link className="page-link" to={`?${path}`}>{i}</Link>
            </li>)
        }

        return list
    }


    searchParam.set(name, currentPage - 1)
    const prevPath = searchParam.toString()

    searchParam.set(name, currentPage + 1)
    const nextPath = searchParam.toString()

    return (
        <nav className="d-flex justify-content-center justify-content-md-end">
            <ul className="pagination pagination-sm text-gray-400">
                {
                    currentPage > 1 && (
                        <li className="page-item">
                            <Link className="page-link page-link-arrow" to={`?${prevPath}`}>
                                <i className="fa fa-caret-left" />
                            </Link>
                        </li>
                    )
                }


                {renderPage()}

                {
                    currentPage < totalPage && (
                        <li className="page-item">
                            <Link className="page-link page-link-arrow" to={`?${nextPath}`}>
                                <i className="fa fa-caret-right" />
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}