import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-row">
                <div className="footer-col-left">
                    <div className="logo-container footer-logo">
                        <img src="https://wokiee.reactdemo.hasthemes.com/assets/images/no-placeholder/logo.png" alt="" />
                        <span>© Wokiee 2021</span>
                    </div>
                </div>
                <div className="footer-col-right">
                    <img src="https://wokiee.reactdemo.hasthemes.com/assets/images/no-placeholder/payment-without-bg.png" alt="" />
                </div>
            </div>
        </div>
    )
}
