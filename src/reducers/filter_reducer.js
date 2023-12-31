import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if(action.type === SET_GRIDVIEW) {
    return {...state, grid_view: true}
  }

  if(action.type === SET_LISTVIEW) {
    return {...state, grid_view: false}
    }

  if(action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if(sort === 'price-lowest') {
      tempProducts = filtered_products.sort((a,b)=>{
        if(a.price > b.price) {
          return 1;
        }
        if(a.price < b.price) {
          return -1;
        }
        return 0;
        /*return a.price - b.price;*/
      });
    }
    if(sort === 'price-highest') {
      tempProducts = filtered_products.sort((a,b)=>{
        if(a.price > b.price) {
          return -1;
        }
        if(a.price < b.price) {
          return 1;
        }
        return 0;
        /*return b.price - a.price;*/
      });
    }
    if(sort === 'name-a') {
      tempProducts = filtered_products.sort((a,b)=>{
        return a.name.localeCompare(b.name);
      });
    }
    if(sort === 'name-z') {
      tempProducts = filtered_products.sort((a,b)=>{
        return b.name.localeCompare(a.name);
      });
    }
    return {...state, filtered_products: tempProducts}
  }

  if(action.type === UPDATE_SORT) {
    return {...state, sort: action.payload}
  }

  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = 0;
    action.payload.map(p => {if(p.price > maxPrice) {maxPrice = p.price}})
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {...state.filters, max_price: maxPrice, price: maxPrice}
    }
  }

  if(action.type === UPDATE_FILTERS) {
    const {name, value} = action.payload;
    return {...state, filters: {...state.filters, [name]: value}}
  }





  if(action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const {
      text,
      category,
      company,
      color,
      price,
      shipping,
    } = state.filters;
    let tempProducts = [...all_products];

    // Filtering...

    if(text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      })
    }
    if(category) {
      tempProducts = tempProducts.filter((product) => {
        if(category == 'all') return true;
        return category === product.category;
      })
    }

    // Category

    if(category !== 'all') {
      tempProducts = tempProducts.filter(
        product => product.category === category)
    }

    // Company

    if(company !== 'all') {
      tempProducts = tempProducts.filter(
        product => product.company === company)
    }

    // Colors

    if(color !== 'all') {
      tempProducts = tempProducts.filter(
        product => {
          return product.colors.find(c => c === color)
        })
    }

    // Price

      tempProducts = tempProducts.filter(product => product.price <= price)

    // Shipping

    if(shipping) {
      tempProducts = tempProducts.filter(product => product.shipping)
    }



    return {...state, filtered_products: tempProducts};
  }






  if(action.type === CLEAR_FILTERS) {
    return {...state,
      filters: {
      ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      }
    };
  }



  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
