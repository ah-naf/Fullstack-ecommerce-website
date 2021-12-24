import React from 'react'
import {Delete} from 'react-iconly'
import './Cart.css'

export default function Cart({data, handleDelete}) {
    const image = data.images.split(' ~ ')[0]
    

    return (
        <div className="cart-container">
            <img src={image} alt="" />
            <div className="cart-product-detail">
                <h6>{data.name}</h6>
                <p>{data.quantity} X <span style={{fontWeight:'700'}}>${(data.price / 80).toPrecision(3)}</span></p>
                <div className="size-and-color-container">
                    <p>{data.size}</p>
                    <div style={{background: data.color}}></div>
                </div>
            </div>
            <div>
            <Delete set="bold" primaryColor="#DD4A48" style={{cursor:'pointer'}} onClick={() => handleDelete(data.cart_id)} />
            </div>
        </div>
    )
}
