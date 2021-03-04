import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const productDes = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h2>This page is product details page</h2>
            <Product showAddToCart={false} product={productDes} />
        </div>
    );
};

export default ProductDetail;