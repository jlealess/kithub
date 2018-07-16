import React from 'react';
import he from 'he';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button1State: 'active',
            button2State: 'active',
            button1Text: this.props.button1Text,
            button2Text: this.props.button2Text
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(button) {
        const buttonStateToChange = `${button}State`;
        const buttonHandler = `${button}Handler`;
        const buttonContext = `${button}Context`;
        const buttonText = `${button}Text`;
        let buttonTextValue = this.state[buttonText];

        if (/Add to/.test(buttonTextValue)) {
          buttonTextValue = buttonTextValue.replace(/Add to/, "Added to");
        } 

        this.setState({
            [buttonStateToChange]: 'disabled',
            [buttonText]: buttonTextValue
        })

        const product = {
            name: this.props.name,
            brand: this.props.brand,
            image_link: this.props.image_link, 
            product_link: this.props.product_link, 
            product_type: this.props.product_type || ''        
        }
        this.props[buttonHandler](this.props.id, this.props[buttonContext], product);
    }
    
    render() {
        const name = he.decode(this.props.name);
        const button1Active = this.state.button1State;
        const button2Active = this.state.button2State;

        return (
            <div className="product" data-id={this.props.id}>
                <h3 className="product__headline">
                    <span className="product__brand">
                        {this.props.brand}
                    </span>
                    <span className="product__name">
                        <a href={this.props.product_link}>{name}</a>
                    </span>
                </h3>
    
                <div className="product__image__container">
                    <img src={this.props.image_link} alt={this.props.name} onError={(e) => { e.target.src = 'images/no-photo-available.png' }} className="product__image" />
                </div>	
                <div className="buttons product__buttons">
                  {this.props.loggedIn === false && <button className="button" onClick={this.props.loginWithGoogle}>
                      Login to save item
                    </button>}
    
                    {this.props.loggedIn === true ? <button onClick={() => this.handleButtonClick('button1')} className={`button button--${button1Active}`}>{this.state.button1Text}</button> : null}
                    
                    {this.props.loggedIn === true ? <button onClick={() => this.handleButtonClick('button2')} className={`button button--${button2Active}`}>{this.state.button2Text}</button> : null}			
                </div>
            </div>
    
            );
    }
}

export default Product;