import React from 'react';
import HomePageHeading from "./HomePageHeading";
import Home from './Home';
import ProductList from './ProductList';
import { sortArray } from './helpers';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        const products = props.products;

        this.state = {
            products
        }

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const products = nextProps.products;
        if (products !== this.state.products) {
            this.setState({
                products
            })
        };
    }

    handleFilterChange(e) {
        const filter = e.target.value;
        this.sortAlpha(filter);
    }

    sortAlpha(attr) {
        const productsToSort = this.state.products;
        const sortedProducts = sortArray(productsToSort, attr);

        this.setState({
            products: sortedProducts
        });
    }

    render() {
        return (
            <div className="home__outer">
                <Home
                    handleSubmit={this.props.handleSubmit}
                    selectedProductType={this.props.selectedProductType}
                    handleChange={this.props.handleChange}
                    productTypes={this.props.productTypes}
                    isProductTypeSelected={this.props.isProductTypeSelected}
                    setCategory={this.props.setCategory}
                    selectedProductCategories={this.props.selectedProductCategories}
                    products={this.props.products}
                />
                <HomePageHeading
                    selectedFilter={this.props.selectedFilter}
                    handleFilterChange={this.handleFilterChange}
                    text={this.props.text}
                />
                <ProductList
                    products={this.state.products}
                    button1Text={"Add to wishlist"}
                    button1Context={"wishList"}
                    button1Handler={this.props.button1Handler}
                    button2Handler={this.props.button2Handler}
                    button2Text={"Add to kit"}
                    button2Context={"kit"}
                    loggedIn={this.props.loggedIn}
                    loginWithGoogle={this.props.loginWithGoogle} 
                />
            </div>
        )
    }
}

export default HomePage;