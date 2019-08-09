import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from "./SearchBar";

class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null,
      APIkey2: '6c95000d9bc67b8ff8fe7d6c72448efb',
      APIkey: '104de0e93fdddafa7db772fbbb2f9654',
      query: '',
      sortType: 't'
    }

    this.changeQueryHandler = this.changeQueryHandler.bind(this);
  }
  // https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2
  componentDidMount() {
    // axios.get('https://www.food2fork.com/api/search?key=' + this.state.APIkey + '').then(response => {
    //   this.setState({recipes: response.data.recipes})
    // })
    // this.loadRecipies();
  }

  loadRecipies(event) {
    if (event) {
      event.preventDefault();
    }
    axios.get('https://www.food2fork.com/api/search?key=' + this.state.APIkey + '&q=' + this.state.query + '&sort=' + this.state.sortType)
    .then(response => {
      this.setState({recipes: response.data.recipes});
    })
    .catch(error => console.error(error))
  }

  changeQueryHandler = (event) => {
    this.setState({query: event.target.value})
  }

  changeSortTypeHandler = (event) => {
    this.setState({sortType: event.target.value})
  }

  render() {
    let loadedRecipes = [];
    if (this.state.recipes) {
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

    return (
      <div>
        <SearchBar
          changeQuery={(event) => this.changeQueryHandler(event)}
          changeSortType={(event) => this.changeSortTypeHandler(event)}
          loadRecipies={(event) => this.loadRecipies(event)}
        />
        <div className="d-flex flex-wrap">
          {loadedRecipes}
        </div>
      </div>
    )
  }
}

export default CardList;
