import React from "react";
import "./searchresult.scss";

function SearchResult(props) {
  return (
    <div className="search-result">
      <div id="img"></div>
      <div>
        <p className="user-name">{props.name}</p>
        <p className="user-loc">
          <i className="fas fa-map-marker-alt" />
          {props.location}
        </p>

        <span className={`user-type ${props.userType}`}>{props.userType}</span>
      </div>
    </div>
  );
}

export default SearchResult;
