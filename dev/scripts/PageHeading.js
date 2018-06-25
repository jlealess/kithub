import React from 'react';
import FilterSelect from './FilterSelect';

const PageHeading = (props) => {
    return <div className="heading">
        <div className="top-angle">
          <svg className="angle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#F1EAFC" points="0,0 100,0 0,100" />
          </svg>
        </div>
        <div className="wrapper">
          <div className="heading__inner">
          <h2 className="page-heading">{props.text}</h2>
          <FilterSelect selectedFilter={props.selectedFilter} handleFilterChange={props.handleFilterChange} />
          </div>
        </div>
      </div>;
}

export default PageHeading;