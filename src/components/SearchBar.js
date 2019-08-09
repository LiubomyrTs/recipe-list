import React from 'react';

const SearchBar = (props) => {
  return (
    <header className="my-3">
      <form>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fa fa-search"></i>
                  </div>
                </div>
                <input
                  className="form-control"
                  type="text"
                  onChange={(event) => props.changeQuery(event)}
                  placeholder="Search By Ingredients or Name"
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    Sort By
                  </div>
                </div>
                <select className="custom-select" defaultValue="t" onChange={(event) => props.changeSortType(event)}>
                  <option value="t">Top-rated</option>
                  <option value="r">Trending</option>
                </select>
              </div>
            </div>
            <div className="col-auto">
              <button
                onClick={(event) => props.loadRecipies(event)}
                type="submit"
                className="btn btn-primary">Seach</button>
            </div>
          </div>
        </form>
      </header>
  )
}

export default SearchBar;
