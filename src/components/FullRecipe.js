import React, { Component } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Aux from '../hoc/Aux';

import { APIkey } from '../constants/index';

class FullRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      error: false,
      errorMessage: '',
      loading: true
    }
    this.loader = <div className="d-flex w-100 justify-content-center" key={this.state.page}><ClipLoader size={300} loading={this.state.loading}/></div>
  }

  componentDidMount() {
    axios.get(`https://www.food2fork.com/api/get?key=${APIkey}&rId=${this.props.match.params.id}`)
    .then(response => {
      // Reached API Call limit
      if (response.data.error === 'limit') {
        this.setState({error: true, errorMessage: 'API Call limit reached', loading: false})
      }
      // If you pass non-existing recipe_id you'll recieve an empty array
      if (response.data.recipe.length === 0) {
        this.setState({errorMessage: 'no recipe found', error: true, loading: false})
      }
      else if (response.data.recipe || response.data.recipe.length) {
        this.setState({recipe: response.data.recipe, error: false, loading: false});
      }
    })
    .catch(error => this.setState({error: true, errorMessage: 'Something went wrong', loading: false}));
  }

  ingredientsList() {
    return this.state.recipe.ingredients.map((ingredient, index)=> {
      return <li key={index} dangerouslySetInnerHTML={{__html: ingredient}}></li>
    })
  }

  render() {
    let loadedRecipe = null;

    if ( this.state.loading ) {
      loadedRecipe = this.loader;
    }

    if (this.state.recipe) {
      loadedRecipe =
      (<Aux>
          <div className="w-25">
            <div className="card mx-3">
              <div style={{backgroundImage:`url(${this.state.recipe.image_url})`}} className="card-img"></div>
                <div className="card-body">
                  <h5 className="card-title">{this.state.recipe.title}</h5>
                </div>
              </div>
            </div>
            <div className="w-75">
              <div className="card mx-3">
                <div className="card-body">
                  <h5 className="card-title">Recipe Info</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <h6>Publisher</h6>
                          {this.state.recipe.publisher}
                      </li>
                      <li className="list-group-item">
                        <h6>Rank</h6>
                        <span className="badge badge-info">{parseInt(this.state.recipe.social_rank)}</span>
                      </li>
                      <li className="list-group-item">
                        <h6>Source</h6>
                        <a target="_blank" rel="noreferrer noopener" href={this.state.recipe.source_url}>{this.state.recipe.source_url}</a>
                      </li>
                        <li className="list-group-item">
                        <h6>Ingredients</h6>
                        <ul>
                          {this.ingredientsList()}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Aux>)
    }


    return (
      <div className="d-flex my-3">
        {(!this.state.error) ? loadedRecipe : <h1>{this.state.errorMessage}</h1>}
      </div>
    )
  }
}

export default FullRecipe;
