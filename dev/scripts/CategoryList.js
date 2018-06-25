import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

const CategoryList = () => {
    return (
        <div className="categories-row">
        <h2 className="categories-row__heading">Find new favourites – browse by category</h2>
        <div class="wrapper">
        <div className="categories">
            <div className="category">
                <h3 className="category__heading">Eyes</h3>
                <ul className="category__list">
                    <li className="category__list__item">
                        <Link to={`/products/eyebrow`}>Eyebrow</Link>
                    </li>
                    <li className="category__list__item">
                        <Link to={`/products/eyeliner`}>Eyeliner</Link>
                    </li>
                    <li className="category__list__item">
                        <Link to={`/products/eyeshadow`}>Eyeshadow</Link>
                    </li>
                    <li className="category__list__item">
                        <Link to={`/products/mascara`}>Mascara</Link>
                    </li>
                </ul>
            </div>
             <div className="category">
                    <h3 className="category__heading">Face</h3>
                    <ul className="category__list">
                        <li className="category__list__item">
                        <Link to={`/products/blush`}>Blush</Link>
                        </li>
                        <li className="category__list__item">
                        <Link to={`/products/blush`}>Bronzer</Link>
                        </li>
                        <li className="category__list__item">
                        <Link to={`/products/foundation`}>Foundation</Link>
                        </li>
                    </ul>
            </div>        
            <div className="category">
                <h3 className="category__heading">Lips</h3>
                <ul className="category__list">
                    <li className="category__list__item">
                        <Link to={`/products/lip_liner`}>Lip Liner</Link>
                    </li>
                    <li className="category__list__item">
                        <Link to={`/products/lipstick`}>Lipstick</Link>
                    </li>
                </ul>
            </div>
            <div className="category">
                <h3 className="category__heading">Nails</h3>
                <ul className="category__list">
                    <li className="category__list__item">
                        <Link to={`/products/nail_polish`}>Nail Polish</Link>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        </div>
    )
}

export default CategoryList;