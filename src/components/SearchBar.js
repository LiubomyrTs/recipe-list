import React from 'react';

const SearchBar = function(props) {
  return (
    <header className="my-3">
      <form>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="query">
                    <i className="fa fa-search" />
                  </label>
                </div>
                <input
                  id="query"
                  className="form-control"
                  type="text"
                  onChange={props.changeQuery}
                  placeholder="Search By Ingredients or Name"
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="type-select">
                    Sort By
                  </label>
                </div>
                <select id="type-select" className="custom-select" defaultValue="r" onChange={props.changeSortType}>
                  <option value="t">Top-rated</option>
                  <option value="r">Trending</option>
                </select>
              </div>
            </div>
            <div className="col-auto">
              <button
                onClick={props.loadRecipies}
                type="submit"
                className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
      </header>
  )
}

export default SearchBar;
