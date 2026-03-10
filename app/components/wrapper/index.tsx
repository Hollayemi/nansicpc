"use client"
import React from 'react'
import Header from './header'
import Footer from './footer'
import RequestQuoteModal from '../RequestQuoteModal'

export interface WrapperProps {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div className="bg-white text-gray-900">
            <Header />
        
            {children}
            <Footer />
        </div>
    )
}

export default Wrapper