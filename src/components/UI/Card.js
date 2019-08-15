import React from 'react';
import { Link } from 'react-router-dom';

const Card = function(props) {
  return (
    <div className="w-25 my-3" key={props.recipe.recipe_id}> {/*REVIEW:  + this.state.page*/}
      <div className="card mx-3 h-100">
        <div style={{backgroundImage:`url(${props.recipe.image_url})`}} className="card-img"></div>
        <div className="card-body">
          <h5 className="card-title" dangerouslySetInnerHTML={{__html: props.recipe.title}}></h5>
          <p className="card-text">{props.recipe.publisher}</p>
          <p className="card-text">
            <span className="badge badge-info">{parseInt(props.recipe.social_rank)}</span>
          </p>
        </div>
        <div className="card-footer">
          <Link className="btn btn-primary" to={"/" + props.recipe.recipe_id}>More</Link>
        </div>
      </div>
    </div>
  )
}

export default Card;
