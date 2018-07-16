import React from 'react';
import PageHeading from './PageHeading';
import ProductList from './ProductList';
import { sortArray } from "./helpers";

class Kit extends React.Component {
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
            <React.Fragment>
                <PageHeading 
                    text={"My Kit"} 
                    selectedFilter={this.props.selectedFilter} 
                    handleFilterChange={this.handleFilterChange}
                />
                <ProductList 
                    products={this.state.products} 
                    button1Text={"Add to wishlist"} 
                    button1Context={"wishList"} 
                    button1Handler={this.props.button1Handler} 
                    button2Text={"Remove from kit"} 
                    button2Context={"kit"}
                    button2Handler={this.props.button2Handler} 
                    loggedIn={this.props.loggedIn}
                />
            </React.Fragment>
        )
    }
}

export default Kit;