'use strict';

const ComponentType = `
  enum ComponentType {
    street_address
    route
    intersection
    political
    country
    administrative_area_level_1
    administrative_area_level_2
    administrative_area_level_3
    administrative_area_level_4
    administrative_area_level_5
    colloquial_area
    locality
    ward
    sublocality
    sublocality_level_1
    sublocality_level_5
    neighborhood
    premise
    subpremise
    postal_code
    natural_feature
    airport
    park
    point_of_interest
    floor
    establishment
    point_of_interest
    parking
    post_box
    postal_town
    locality
    sublocality
    room
    street_number
    bus_station
    train_station
    transit_station
    floor
    establishment
    point_of_interest
    parking
    post_box
    postal_town
    locality
    sublocality
    room
    street_number
    bus_station
    train_station
    transit_station
  }
`;

const AddressComponent = `
  type AddressComponent {
    long_name: String
    short_name: String
    types: [ComponentType]
  }
`;
const Location = `
  type Location {
    lat: Float
    lng: Float
  }
`;

const Viewport = `
  type Viewport {
    northeast: Location
    southwest: Location
  }
`;

const Geometry = `
  type Geometry {
    location: Location
    location_type: String
    viewport: Viewport
  }
`;

const Geocode = `
  type Geocode {
    place_id: String
    types: [ComponentType]
    address_components: [AddressComponent]
    formatted_address: String
    geometry: Geometry
  }
`;

const OpeningHours = `
  type OpeningHours {
    open_now: Boolean
  }
`;

const AltId = `
  type AltId {
    place_id: String
    scope: String
  }
`;

const Photo = `
  type Photo {
    width: Int
    height: Int
    photo_reference: String
    html_attributions: [String]
  }
`;

const PlaceNearby = `
  type PlaceNearby {
    id: String
    place_id: String
    alt_ids: [AltId]
    reference: String
    types: [ComponentType]
    scope: String
    name: String
    icon: String
    vicinity: String
    opening_hours: OpeningHours
    photos: [Photo]
    geometry: Geometry
  }
`;

module.exports = [
  PlaceNearby,
  Photo,
  AltId,
  OpeningHours,
  Geocode,
  Geometry,
  Viewport,
  Location,
  AddressComponent,
  ComponentType,
];
