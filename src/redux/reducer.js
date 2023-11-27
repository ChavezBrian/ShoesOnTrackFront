import {
  FILTROS_AND_PAGINATION,
  GET_BY_ID,
  GET_PRODUCTS_BY_NAME,
  CLEAR_DETAIL,
  GET_ALL_CATEGORIES,
  SEARCH_PRODUCTS,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  SORT_PRICE,
  GET_FAVORITES,
  RESET,
} from "./action-type";

const initialState = {
  indexProductShow: [],
  productDetail: [],
  categories: [],
  filters: [],
  reviews: [],
  user: {},
  carrito: [],
  favorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_ALL_PRODUCTS:
    //   return {
    //     ...state,
    //     AllProducts: action.payload,
    //     productShow: action.payload,
    //   };
    case FILTROS_AND_PAGINATION:
      return {
        ...state,
        indexProductShow: action.payload,
      };
    
    case GET_BY_ID: 
    return {
      ...state,
      productDetail: action.payload
    };

    case CLEAR_DETAIL:
      return {
        ...state,
        productDetail: []
      }

    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        productShow: action.payload
      }
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        carrito: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        carrito: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        carrito: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        carrito: action.payload.data,
        productId: action.payload.id_producto,
      };

    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return {...state};
  }
};

export default rootReducer;
