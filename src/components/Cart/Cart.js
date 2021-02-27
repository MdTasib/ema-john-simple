import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // (1)
    // const total = cart.reduce((total, productItem) => total + productItem.price, 0);
    // (2)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i]
        total += product.price;
    }

    let shipping = 0;
    if (total > 350) {
        shipping = 0;
    } else if (total > 150) {
        shipping = 4.99;
    } else if (total > 30) {
        shipping = 12.99;
    }

    const tax = Math.round(total / 10);

    const totalAmount = Math.round(total + shipping + tax);
    return (
        <div>
            <h3>Order</h3>
            <h5>Order Summery : {cart.length}</h5>
            <p><small>TAX: ${tax}</small></p>
            <p><small>Shipping Cost : ${shipping}</small></p>
            <h5>Total Price : ${totalAmount}</h5>
            <button>Review your order</button>
        </div>
    );
};

export default Cart;