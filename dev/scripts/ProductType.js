import React from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import PageHeading from './PageHeading';

class ProductType extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            category: ''
        }
    }

    componentDidMount() {
        const productType = this.props.match.params.productType;
        axios({
            url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
            method: "GET",
            responseType: "json",
            params: {
                product_type: productType
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                products: res.data,
                category: productType
            });
        });
    }

    render() {
        return <div>
            <PageHeading text={this.state.category} selectedFilter={this.props.selectedFilter} handleFilterChange={this.props.handleKitFilterChange} />
            <ProductList 
                products={this.state.products} 
                loggedIn={this.props.loggedIn} 
                currentUserId={this.props.currentUserId} 
                button1Text={this.props.button1Text} 
                button1Handler={this.props.button1Handler} 
                button1Context={this.props.button1Context} 
                button2Text={this.props.button2Text} 
                button2Handler={this.props.button2Handler} 
                button2Context={this.props.button2Context} 
            />
        </div>;
    }
}

export default ProductType;