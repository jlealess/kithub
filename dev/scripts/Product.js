import React from 'react';
import firebase from 'firebase';
import Colorset from './ColorSet';
import he from 'he';


const Product = (props) => {
	const name = he.decode(props.name);
    return (
        <div className="product" data-id={props.id}>
            <h3 className="product__headline">
                <span className="product__brand">
                    {props.brand}
                </span>
                <span className="product__name">
					<a href={props.product_link}>{name}</a>
				</span>
            </h3>

			<div className="product__image__container">
                <img src={props.image_link.startsWith('http://imancosmetics') ? 'images/no-photo-available.png' : props.image_link} alt={props.name} className="product__image" />
			</div>	
			<div className="buttons product__buttons">
              {props.loggedIn === false && <button className="button" onClick={props.loginWithGoogle}>
                  Login to save item
                </button>}

				{props.loggedIn === true ? <button onClick={() => { props.button1Handler(props.id, props.button1Context, props.name, props.brand, props.image_link, props.product_link, props.product_type ) }} className="button button__wishlist button__toggle">{props.button1Text}</button> : null}
				
				{props.loggedIn === true ? <button onClick={() => { props.button2Handler(props.id, props.button2Context, props.name, props.brand, props.image_link, props.product_link, props.product_type) }} className="button button__kit button__toggle">{props.button2Text}</button> : null}			
			</div>
		</div>

		);
}

export default Product;