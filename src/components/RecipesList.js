import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import Aux from '../hoc/Aux';
import SearchBar from './SearchBar';
import Card from './UI/Card';

import { APIkey } from '../constants/index';

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

    this.loader = <div className="d-flex w-100 justify-content-center" key={this.state.page}><ClipLoader size={300} loading={this.state.loading}/></div>

  }

  loadRecipies(event) {
    if (event) {
      this.setState({recipes: [], page: 1})
      event.preventDefault();
    }
    if (!this.state.loading) {
      this.setState({loading: true});
    }

    axios.get(`https://www.food2fork.com/api/search?key=${APIkey}&q=${this.state.query}&sort=${this.state.sortType}&page${this.state.page}`)
    .then(response => {
      // Reached API Call limit
      if (response.data.error === "limit") {
        this.setState({error: true, errorMessage: 'API Call limit reached', loading: false, loadMore: false})
      }
      else if (!response.data.recipes.length) {
        this.setState({error: true, errorMessage: 'No recipes found', loading: false, loadMore: false})
      }
      else {
        this.setState({recipes: [...this.state.recipes, ...response.data.recipes], loading: false, error: false, page: this.state.page+1, loadMore: response.data.count === 30});
      }

    })
    .catch(error => this.setState({error: true, errorMessage: 'Something went wrong'}))
  }

  changeQueryHandler(event) {
    this.setState({query: event.target.value})
  }

  changeSortTypeHandler(event) {
    this.setState({sortType: event.target.value})
  }

  render() {
    let loadedRecipes = [];
    if (this.state.recipes.length) {
      loadedRecipes = this.state.recipes.map(recipe => {
        return (
          <Card recipe={recipe}/>
        )
      })
    }

    return (
      <Aux>
          <SearchBar
            changeQuery={(event) => this.changeQueryHandler(event)}
            changeSortType={(event) => this.changeSortTypeHandler(event)}
            loadRecipies={(event) => this.loadRecipies(event)}
          />
        <div style={{height: "100vh"}} >
          <InfiniteScroll
                useWindow={true}
                pageStart={0}
                loadMore={() => this.loadRecipies()}
                hasMore={this.state.loadMore}
                loader={this.loader}
              >
              { this.state.error ? <h1>{this.state.errorMessage}</h1> : <div className="d-flex flex-wrap">{loadedRecipes}</div> }
          </InfiniteScroll>
          </div>
      </Aux>
    )
  }
}

export default RecipesList;
