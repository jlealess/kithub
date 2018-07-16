import React from 'react';
import Product from './Product';

const ProductList = (props) => {
    return (
        <div className="wrapper">
            {props.products.length > 0 ? 
                    <ul className="product__list">
                        {props.products.map((product, i) => {
                            return (
                                <li className="product__item" key={product.id}>
                                    <Product
                                        brand={product.brand}
                                        description={product.description}
                                        id={product.id}
                                        image_link={product.image_link}
										name={product.name}
                                        product_link={product.product_link}
                                        product_type={product.product_type}
                                        button1Text={props.button1Text}
                                        button1Handler={props.button1Handler}
                                        button1Context={props.button1Context}
                                        button2Handler={props.button2Handler}
                                        button2Text={props.button2Text}
                                        button2Context={props.button2Context}
                                        loggedIn={props.loggedIn}
                                        loginWithGoogle={props.loginWithGoogle}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                : <p className="products__no-results">No products to display yet</p>
            }
    </div>
    )
}

export default ProductList;