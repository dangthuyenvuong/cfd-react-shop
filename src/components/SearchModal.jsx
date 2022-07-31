import React, { useState } from 'react'
import { Drawer } from 'antd'
import { useGlobalState } from '../hooks/useGlobalState'
import productSerivce from '../services/product'
import { currency } from '../utils/currency'
import Skeleton from './Skeleton'
import { Link } from 'react-router-dom'
import { PRODUCT_DETAIL_PATH, PRODUCT_PATH } from '../constants/path'
import { useCategories } from '../hooks/useCategories'




// 1. Sử dụng Drawer (antd) để cho xuất hiện UI search 
// 2. Handle nút search, enter cho value debound 500ms
// 3. Gọi api product và thêm search by name
// 4. Handle link “Xem tất cả”
// 5. Thêm search vào trang product list
// 6. Gắn thông tin search lên product list để user biết đang search gì
// 7. Search theo 1 category nào đó


const serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default function SearchModal() {
    // const [isOpen, setIsOpen] = useState(false)
    const { isOpenSearchModal, setIsOpenSearchModal } = useGlobalState()
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { categories, loadingCategory } = useCategories()


    const [cat, setCat] = useState('')


    const _search = async () => {

        if (search?.trim()) {
            setIsLoading(true)
            const data = await productSerivce.getProduct(`?limit=5&name=${search}` + (cat ? `&categories=${cat}` : ''))
            setProducts(data.data)
            setIsLoading(false)
        }
    }

    const onSearch = (ev) => {
        ev.preventDefault()
        console.log('onSearch')

        _search()
    }

    // const onKeyUp = (ev) => {
    //     ev.stopPropagation()
    //     ev.preventDefault()
    //     if (ev.key === 'Enter') {
    //         _search()
    //     }
    // }

    const category = cat ? categories.find(e => e.id === parseInt(cat)) : null
    const linkAll = (category ? `/${category.slug}` : PRODUCT_PATH) + '?' + new URLSearchParams('?q=' + search).toString()

    return (
        <Drawer
            visible={isOpenSearchModal}
            width={453}
            bodyStyle={{ padding: 0 }}
            onClose={() => setIsOpenSearchModal(false)}
            closeIcon={null} headerStyle={{ display: 'none' }}
        >
            <div className="modal-content">
                {/* Close */}
                <button type="button" onClick={() => setIsOpenSearchModal(false)} className="close" data-dismiss="modal" aria-label="Close">
                    <i className="fe fe-x" aria-hidden="true" />
                </button>
                {/* Header*/}
                <div className="modal-header line-height-fixed font-size-lg">
                    <strong className="mx-auto">Tìm kiếm sản phẩm</strong>
                </div>
                {/* Body: Form */}
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="modalSearchCategories">Categories:</label>
                            <select value={cat} onChange={(ev) => setCat(ev.target.value)} className="custom-select" id="modalSearchCategories">
                                <option selected>Tất cả sản phẩm</option>
                                {
                                    !loadingCategory && categories.map(e => <option value={e.id} key={e.id}>{e.title}</option>)
                                }
                            </select>
                        </div>
                        <div className="input-group input-group-merge">
                            <input value={search} onChange={(ev) => setSearch(ev.target.value)} className="form-control" type="search" placeholder="Tìm kiếm..." />
                            <div className="input-group-append">
                                <button onClick={onSearch} className="btn btn-outline-border" type="submit">
                                    <i className="fe fe-search" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Body: Results (add `.d-none` to disable it) */}
                <div className="modal-body border-top font-size-sm">
                    {/* Heading */}
                    <p>Kết quả tìm kiếm:</p>
                    {/* Items */}
                    {
                        isLoading ? [...Array(5)].map((e, i) => <Skeleton style={{ marginBottom: 20 }} key={i} height={82} />) :
                            products.length === 0 ? (
                                <div className="modal-body">
                                    {/* Text */}
                                    <p className="mb-3 font-size-sm text-center">
                                        Không tìm thấy sản phẩm
                                    </p>
                                    <p className="mb-0 font-size-sm text-center">
                                        😞
                                    </p>
                                </div>
                            ) : products.map(e => (
                                <div key={e._id} className="row align-items-center position-relative mb-5">
                                    <div className="col-4 col-md-3">
                                        {/* Image */}
                                        <img className="img-fluid" src={e.images?.[0]?.thumbnail_url} alt="..." />
                                    </div>
                                    <div className="col position-static">
                                        {/* Text */}
                                        <p className="mb-0 font-weight-bold">
                                            <a className="stretched-link text-body" href="./product.html">{e.name}</a> <br />
                                            <span className="text-muted">{currency(e.real_price)}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                    }

                    {/* Button */}
                    <Link onClick={() => setIsOpenSearchModal(false)} className="btn btn-link px-0 text-reset" to={linkAll}>
                        Xem tất cả <i className="fe fe-arrow-right ml-2" />
                    </Link>
                </div>
                {/* Body: Empty (remove `.d-none` to disable it) */}

            </div>
        </Drawer>
    )
}
