import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import Aux from '../hoc/Aux';
import SearchBar from "./SearchBar";

const APIkey = process.env.REACT_APP_API_KEY;

class RecipesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      query: '',
      sortType: 'r',
      page: 1,
      error: false,
      loading: true,
      errorMessage: '',
      loadMore: true,
    }

    this.changeQueryHandler = this.changeQueryHandler.bind(this);
    this.changeSortTypeHandler = this.changeSortTypeHandler.bind(this);
  }

  loadRecipies(event) {
    if (event) {
      this.setState({recipes: [], page: 1})
      event.preventDefault();
    }
    if (!this.state.loading) {
      this.setState({loading: true});
    }
    console.log(this.state.page)

    axios.get('https://www.food2fork.com/api/search?key=' + APIkey + '&q=' + this.state.query + '&sort=' + this.state.sortType + '&page=' + this.state.page)
    .then(response => {
      // Reached API Call limit
      if (response.data.error === "limit") {
        this.setState({error: true, errorMessage: 'API Call limit reached', loading: false, loadMore: false})
      }
      else if (!response.data.recipes.length) {
        this.setState({error: true, errorMessage: 'No recipes found', loading: false, loadMore: false})
        console.log(response, 'ERROR')
      }
      else {
        this.setState({recipes: [...this.state.recipes, ...response.data.recipes], loading: false, error: false, page: this.state.page+1, loadMore: response.data.count === 30});

        console.log("PAGE LOAD");
        console.log(response)
        console.log(this.state.page)
      }

    })
    .catch(error => this.setState({error: true, errorMessage: 'Something went wrong'}))
  }

  changeQueryHandler = (event) => {
    this.setState({query: event.target.value})
  }

  changeSortTypeHandler = (event) => {
    this.setState({sortType: event.target.value})
  }

  render() {
    let loadedRecipes = [];
    if (this.state.recipes.length) {
      loadedRecipes = this.state.recipes.map(recipe => {
        return (
          <div className="w-25 my-3" key={recipe.recipe_id}>
            <div className="card mx-3 h-100">
              <div style={{backgroundImage:"url(" + recipe.image_url + ")"}} className="card-img"></div>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.publisher}</p>
                <p className="card-text">
                  <span className="badge badge-info">{parseInt(recipe.social_rank)}</span>
                </p>
              </div>
              <div className="card-footer">
                <Link className="btn btn-primary" to={"/" + recipe.recipe_id}>More</Link>
              </div>
            </div>
          </div>
        )
      })
    }

    const loader = <div className="d-flex w-100 justify-content-center"><ClipLoader size={300} loading={this.state.loading}/></div>

    return (
      <Aux>
          <SearchBar
            changeQuery={(event) => this.changeQueryHandler(event)}
            changeSortType={(event) => this.changeSortTypeHandler(event)}
            loadRecipies={(event) => this.loadRecipies(event)}
          />
        <div style={{height: "100vh"}} > {/* overflow auto */}
          <InfiniteScroll
                pageStart={0}
                loadMore={() => this.loadRecipies()}
                hasMore={this.state.loadMore}
                loader={loader}
              >
              { this.state.error ? <h1>{this.state.errorMessage}</h1> : <div className="d-flex flex-wrap">{loadedRecipes}</div> }
          </InfiniteScroll>
          </div>
      </Aux>
    )
  }
}

export default RecipesList;
