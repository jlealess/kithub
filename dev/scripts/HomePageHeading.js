import React from 'react';
import FilterSelect from './FilterSelect';

const HomePageHeading = (props) => {
    return <div className="wrapper">
        <div className="heading--home">
            <h2 className="page-heading page-heading--home">{props.text}</h2>
            <FilterSelect selectedFilter={props.selectedFilter} handleFilterChange={props.handleFilterChange} />
        </div>
    </div>;
}

export default HomePageHeading;