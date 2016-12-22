'use strict';

const app = {};

app.util = (function(navigator) {

  return {
    getQueryStr
  };

  function getQueryStr() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve(`
{
  credits
  coffeePlaces: placesNearby(
    keyword: "coffee shops",
    location: {
      lat: ${position.coords.latitude},
      lng: ${position.coords.longitude}
    }
    opennow: true
  ) {
    ...basicPlaceInfo
  }
  pizzaPlaces: placesNearby(
    keyword: "pizza",
    location: {
      lat: ${position.coords.latitude},
      lng: ${position.coords.longitude}
    }
  ) {
    ...basicPlaceInfo
  }
  stevesHomeAddress: geocode(address: "123 street Duluth, GA") {
    formatted_address
  }
}

fragment basicPlaceInfo on PlaceNearby {
  id
  place_id
  name
}
        `.trim());
      }, reject, {
        // enableHighAccuracy: true
      });
    });
  }
})(navigator);

(function(document, app, Prism) {
  const getCoordsBtnEl = document.getElementById('getCoordsBtn');
  const gqlQueryEl = document.getElementById('gqlQuery');

  getCoordsBtnEl.addEventListener('click', function() {
    gqlQueryEl.innerHTML = '// Loading...';
    app.util.getQueryStr().then((queryStr) => {
      // let positionStr = JSON.stringify(position, null, 2);
      gqlQueryEl.innerHTML = Prism.highlight(queryStr, Prism.languages.json);
    });
  });

})(document, app, window.Prism);

(function(React, ReactDOM, GraphQLDocs) {
  const docsEl = document.getElementById('docs');

  ReactDOM.render(React.createElement(GraphQLDocs, {
    fetcher(query) {
      return fetch(window.location.origin + '/api/service1', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      }).then(res => res.json());
    }
  }), docsEl);
})(window.React, window.ReactDOM, window.GraphQLDocs.GraphQLDocs);
