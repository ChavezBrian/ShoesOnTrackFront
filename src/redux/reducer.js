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
  GET_FAVORITES,
  GET_USER_PRODUCTS,
  CREATE_SHOES,
  USER_LOGEADO,
  CLEAR_USER,
  CHANGE_SHOE,
  DELETE_SHOE,
  GET_ALL_CARTS,
  GET_ALL_FAVS,
  NEW_CART,
  NEW_FAVORITE,
  REMOVE_CART_BACK,
  REMOVE_FAV_BACK,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
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
  userProducts: [],
  deleteProducts: [],
  sendingEmail: false, // Indica si se está enviando un correo electrónico
  emailSent: false, // Indica si el correo electrónico se envió con éxito
  emailError: null, // Almacena el error si hay un problema al enviar el correo electrónico
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

    case GET_ALL_FAVS:
      return {
        ...state,
        favorites: action.payload
      }

    case NEW_FAVORITE:
      return {
        ...state,
        favorites: action.payload
      }

    case REMOVE_FAV_BACK:
      return {
        ...state,
        allFavoritesBack: action.payload
      }

    case GET_ALL_CARTS:
      return {
        ...state,
        carrito: action.payload
      }

    case NEW_CART:
      return {
        ...state,
        carrito: action.payload
      }

    case REMOVE_CART_BACK:
      return {
        ...state,
        carrito: action.payload
      }

    case USER_LOGEADO:
      return {
        ...state,
        user: action.payload
      };

    case CLEAR_USER:
      return {
        ...state,
        user: {}
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

    case GET_USER_PRODUCTS:
      return {
        ...state,
        userProducts: action.payload
      }
    case CREATE_SHOES:
      return {
        ...state,
        userProducts: [...state.userProducts, action.payload]
      }
    case CHANGE_SHOE:
      return {
        ...state,
        userProducts: action.payload
      }
    case DELETE_SHOE:
      return {
        ...state,
        deleteProducts: action.payload
      }
    case SEND_EMAIL_REQUEST:
      return {
        ...state,
        sendingEmail: true,
        emailSent: false,
        emailError: null,
      };

    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        sendingEmail: false,
        emailSent: true,
        emailError: null,
      };

    case SEND_EMAIL_FAILURE:
      return {
        ...state,
        sendingEmail: false,
        emailSent: false,
        emailError: action.payload, // Almacena el mensaje de error
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
