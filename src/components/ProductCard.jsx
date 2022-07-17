import { currency } from '../utils/currency'
import { Link, generatePath } from 'react-router-dom'
import { PRODUCT_DETAIL_PATH } from '../constants/path'
import profileService from '../services/profile'
import {message} from 'antd'
import { useMemo } from 'react'
export default function ProductCard({ product }) {

    const { name, real_price, price, images, slug, _id } = product
    const path = useMemo(() => generatePath(PRODUCT_DETAIL_PATH, { slug }), [slug])

    const addWishlist = async () => {
        await profileService.addWishlist(_id)
        message.success('Đã thêm sản phẩm vào danh sách yêu thích thành công!')
    }

    return (
        <div className="col-6 col-md-4">
            {/* Card */}
            <div className="card mb-7">
                {/* Badge */}
                <div className="badge badge-white card-badge card-badge text-uppercase">
                    New
                </div>
                {/* Image */}
                <div className="card-img">
                    {/* Image */}
                    <Link to={path}>
                        <img className="card-img-top card-img-front" src={images?.[0]?.thumbnail_url} alt="..." />
                    </Link>
                    {/* Actions */}
                    <div className="card-actions">
                        <span className="card-action">
                            <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                <i className="fe fe-eye" />
                            </button>
                        </span>
                        <span className="card-action">
                            <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                <i className="fe fe-shopping-cart" />
                            </button>
                        </span>
                        <span className="card-action">
                            <button className="btn btn-xs btn-circle btn-white-primary" onClick={addWishlist}>
                                <i className="fe fe-heart" />
                            </button>
                        </span>
                    </div>
                </div>
                {/* Body */}
                <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">Shoes</a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                        <Link className="text-body" to={path}>
                            {name}
                        </Link>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">
                        {currency(real_price)}
                    </div>
                </div>
            </div>
        </div>
    )
}
