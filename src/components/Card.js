import React from 'react';

const Card = (props) => {
    console.log(props.recipe)
    if (props.recipe) {
      return (
      <div className="w-25 my-3">
        <div className="card mx-3 h-100">
          <div style={{backgroundImage:"url(" + props.recipe.image_url + ")"}} className="card-img"/>
          <div className="card-body">
            <h5 className="card-title">{props.recipe.title}</h5>
            <p className="card-text">{props.recipe.publisher}</p>
            <p className="card-text">
              <span class="badge badge-info">{props.recipe.social_rank}</span>
            </p>
          </div>
          <div className="card-footer">
            <a href="#" className="btn btn-primary">More</a>
          </div>
        </div>
      </div>
      )
    }
    else {
      return null;
    }
}

export default Card;
