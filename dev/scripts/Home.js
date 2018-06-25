import React from 'react';
import ProductList from './ProductList';

const Home = (props) => {
    return (
		<div className="home">
        <div className="wrapper">
            <div className="home__inner">
                <div className="intro">
                        <p className="intro__p">Search for makeup products by type and category, and keep track of your favourites. Add products you own to your makeup Kit, and save coveted cosmetics to your Wishlist!</p>
                </div>
                                
                <form action="" onSubmit={props.handleSubmit} className="form form--product-search">
                    <h3 className="form--product-search__heading">Search for Products</h3>
                    <select name="selectedProductType" value={props.selectedProductType} onChange={props.handleChange} className="form--product-search__select">
                        {props.productTypes.map((productType, i) => {
                            return <option value={productType.value} key={i}>
                                {productType.name}
                            </option>;
                        })}
                    </select>
                    {props.isProductTypeSelected === true ?
                        <select onChange={props.setCategory} name="selectedCategory" value={props.selectedProductType.categories} className="form--product-search__select">
                            {props.selectedProductCategories.map((category, i) => {
                                return (
                                    <option value={category} key={i}>
                                        {category}
                                    </option>
                                )
                            })}
                        </select>
                        : null}

                    <input className="button button--reverse button--submit" type="submit" value="Find Products" />
                </form> 
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="#ffffff" points="100,0 100,100 0,100" />
        </svg>
            
		</div>
    )
}

export default Home;