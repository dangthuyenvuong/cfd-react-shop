
import { message } from 'antd'
import React from 'react'
import profileService from '../services/profile'
import { currency } from '../utils/currency'

export default function WishlistCard({ product , onRemove}) {
    const removeWishlist = async () => {
        await profileService.removeWishlist(product._id)
        message.success('Xóa sản phẩm khỏi danh sách yêu thích thành công!')
        onRemove?.()
    }

    return (
        <div className="col-6 col-md-4">
            <div className="card mb-7">
                {/* Image */}
                <div className="card-img">
                    {/* Action */}
                    <button onClick={removeWishlist} className="btn btn-xs btn-circle btn-white-primary card-action card-action-right">
                        <i className="fe fe-x" />
                    </button>
                    {/* Badge */}
                    <span className="badge badge-dark card-badge card-badge-left text-uppercase">
                        Sale
                    </span>
                    {/* Button */}
                    <button className="btn btn-xs btn-block btn-dark card-btn" data-toggle="modal" data-target="#modalProduct">
                        <i className="fe fe-eye mr-2 mb-1" /> Quick View
                    </button>
                    {/* Image */}
                    <img className="card-img-top" src={product.images?.[0]?.thumbnail_url} alt="..." />
                </div>
                {/* Body */}
                <div className="card-body font-weight-bold text-center">
                    <a className="text-body" href="product.html">{product.name}</a> <br />
                    <span>
                        <span className="font-size-xs text-gray-350 text-decoration-line-through">{currency(product.price)}</span>
                        {product.real_price && <span className="text-primary">{currency(product.real_price)}</span>}
                        
                    </span>
                </div>
            </div>
        </div>
    )
}
