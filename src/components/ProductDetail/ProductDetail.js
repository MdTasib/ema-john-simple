import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    // page title
    document.title = 'Product Details';
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
            <h2>This page is product details page</h2>
            <Product showAddToCart={false} product={product} />
        </div>
    );
};

export default ProductDetail;