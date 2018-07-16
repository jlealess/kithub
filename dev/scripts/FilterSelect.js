import React from 'react';

const FilterSelect = (props) => {
    return (
        <form action="" className="form form--inline">
            <label htmlFor="filterProducts" className="visually-hidden">Sort by</label>
            <select name="filterProducts" value={props.selectedFilter} onChange={props.handleFilterChange}>
                <option value="">Sort by:</option>
                <option value="brand">Brand</option>
                <option value="product_type">Product type</option>
                <option value="name">Product name</option>
            </select>
        </form>
    )
}

export default FilterSelect;