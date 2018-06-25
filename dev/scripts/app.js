import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';
import ProductList from './ProductList';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import PageHeading from './PageHeading';
import HomePageHeading from './HomePageHeading';
import ProductType from './ProductType';
import CategoryList from './CategoryList';
import { shuffle } from './helpers';


const config = {
  // apiKey: "AIzaSyCqf-B49wkmM2dxSkJoOR1uwF0lfypU-vw",
  // authDomain: "kithub-aa9f5.firebaseapp.com",
  // databaseURL: "https://kithub-aa9f5.firebaseio.com",
  // projectId: "kithub-aa9f5",
  // storageBucket: "",
  // messagingSenderId: "321165294365"
    apiKey: "AIzaSyDk2RD3uR9uJxIa4ZN5J1S4g2mVmpqdre0",
    authDomain: "kithub-v2.firebaseapp.com",
    databaseURL: "https://kithub-v2.firebaseio.com",
    projectId: "kithub-v2",
    storageBucket: "kithub-v2.appspot.com",
    messagingSenderId: "658171645254"
};

firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      productTypes: [
        { name: "-- Select a Product --" },
        {
          name: "Blush",
          value: "blush",
          categories: ["-- Select Product Type --", "All"]
        },
        {
          name: "Bronzer",
          value: "bronzer",
          categories: ["-- Select Product Type --", "All"]
        },
        {
          name: "Eyebrow",
          value: "eyebrow",
          categories: ["-- Select Product Type --", "All"]
        },
        {
          name: "Eyeliner",
          value: "eyeliner",
          categories: [
            "-- Select Product Type --",
            "All",
            "Liquid",
            "Pencil",
            "Gel",
            "Cream"
          ]
        },
        {
          name: "Eyeshadow",
          value: "eyeshadow",
          categories: ["-- Select Product Type --", "All", "Palette", "Pencil"]
        },
        {
          name: "Foundation",
          value: "foundation",
          categories: [
            "-- Select Product Type --",
            "All",
            "Liquid",
            "Contour",
            "Bb cc",
            "Concealer",
            "Cream",
            "Mineral",
            "Powder",
            "Highlighter"
          ]
        },
        {
          name: "Lip Liner",
          value: "lip_liner",
          categories: ["-- Select Product Type --", "All"]
        },
        {
          name: "Lipstick",
          value: "lipstick",
          categories: [
            "-- Select Product Type --",
            "All",
            "Lipstick",
            "Lip Gloss",
            "Liquid",
            "Lip Stain"
          ]
        },
        {
          name: "Mascara",
          value: "mascara",
          categories: ["-- Select Product Type --", "All"]
        },
        {
          name: "Nail Polish",
          value: "nail_polish",
          categories: ["-- Select Product Type --", "All"]
        }
      ],
      isProductTypeSelected: false,
      selectedProductType: "",
      selectedProductCategories: [],
      searchQuery: "",
      queryResults: [],
      productsToDisplay: [],
      categoryToDisplay: "",
      currentUserId: "",
      currentUser: "",
      loggedIn: false,
      displayAddToWishlist: true,
      displayAddToKit: true,
      displayRemove: true,
      currentUserWishlist: [],
      currentUserKit: [],
      featuredProducts: [],
      homePageHeadline: "",
      secondaryNavVisible: false,
      selectedFilter: "",
      arrayToSort: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.addToList = this.addToList.bind(this);
    this.sortProductsAlpha = this.sortProductsAlpha.bind(this);
    this.sortWishlistAlpha = this.sortWishlistAlpha.bind(this);
    this.sortKitAlpha = this.sortKitAlpha.bind(this);
    this.showSecondaryNav = this.showSecondaryNav.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleKitFilterChange = this.handleKitFilterChange.bind(this);
    this.handleWishlistFilterChange = this.handleWishlistFilterChange.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref("users");
    this.featuredProductsDbRef = firebase.database().ref("featured-products");
    this.featuredProductsDbRef.on("value", snapshot => {
      const products = Object.keys(snapshot.val());
      const shuffledProducts = shuffle(products);
      shuffledProducts.map(product => this.getProductById(product));
      this.setState({
        homePageHeadline: "Featured Products"
      });
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        let dbRefUser = firebase.database().ref("users/" + user.uid);

        // checks to see if current user exists; if not, creates user
        dbRefUser.on("value", snapshot => {
          if (snapshot.exists()) {
            let loggedInUser = snapshot.val();
            let loggedInUserKit = loggedInUser.kit || {};
            let loggedInUserWishlist = loggedInUser.wishList || {};
            let loggedInUserWishlistArray = Object.values(loggedInUserWishlist);
            let loggedInUserKitArray = Object.values(loggedInUserKit);

            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId,
              currentUserWishlist: loggedInUserWishlistArray,
              currentUserKit: loggedInUserKitArray
            });
            this.dbRefUser = dbRefUser;
          } else {
            let loggedInUser = {
              userId: user.uid,
              userName: user.displayName
            };
            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId
            });
            dbRefUser.set(loggedInUser);
          }
        });
      } else {
        this.setState({
          loggedIn: false,
          currentUser: null,
          currentUserKit: [],
          currentUserWishlist: []
        });
      }
    });
  }
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }
  logout() {
    firebase.auth().signOut();
    this.dbRef.off("value");
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
        isProductTypeSelected: true
      },
      () => {
        this.getResultsByProductType();
      }
    );
  }

  removeProduct(productId, productList, ...Args) {
    firebase
      .database()
      .ref(`users/${this.state.currentUserId}/${productList}/${productId}`)
      .remove();
  }

  getProductById(productId) {
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products/${productId}.json`,
      method: "GET",
      responseType: "json"
    }).then(res => {
      const product = res.data;
      const featuredProducts = this.state.featuredProducts;
      const matches = [];
      for (let i = 0; i < featuredProducts.length; i++) {
        if (featuredProducts[i].id === productId) {
          matches.push(productId);
        }
      }
      if (matches.length === 0) {
        featuredProducts.push(product);
      }

      this.setState({
        featuredProducts,
        productsToDisplay: featuredProducts
      });
    });
  }

  getResultsByProductType() {
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
      method: "GET",
      responseType: "json",
      params: {
        product_type: `${this.state.selectedProductType}`
      }
    }).then(res => {
      this.setState(
        {
          queryResults: res.data
        },
        () => {
          this.getCategory();
        }
      );
    });
  }

  setCategory(e) {
    this.setState({
      [e.target.name]: e.target.value,
      categoryToDisplay: e.target.value
    });
  }

  getCategory() {
    let products = this.state.productTypes;
    for (let i = 0; i < products.length; i++) {
      if (products[i].value === this.state.selectedProductType) {
        this.setState({
          selectedProductCategories: products[i].categories
        });
      }
    }
  }

  getProducts() {
    const queryResults = Array.from(this.state.queryResults);
    let productsWithCurrentCategory = [];
    let headline = `Results for ${
      this.state.selectedProductType
    } – ${this.state.categoryToDisplay.toLowerCase()}`;

    if (this.state.categoryToDisplay === "All") {
      productsWithCurrentCategory.push(...queryResults);
    } else {
      for (let i = 0; i < queryResults.length; i++) {
        if (
          queryResults[i].category ===
          this.state.categoryToDisplay.replace(/\s/g, "_").toLowerCase()
        ) {
          productsWithCurrentCategory.push(queryResults[i]);
        }
      }
    }
    this.setState({
      productsToDisplay: productsWithCurrentCategory,
      homePageHeadline: headline
    });
  }

  showSecondaryNav() {
    console.log('clicked');
    this.setState({
      secondaryNavVisible: !this.state.secondaryNavVisible
    }, () => {console.log(this.state.secondaryNavVisible)})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getProducts();
  }

  handleFilterChange(e) {
    const filter = e.target.value;
    this.setState({
      selectedFilter: filter
    }, () => this.sortProductsAlpha());
  }

  handleWishlistFilterChange(e) {
    const filter = e.target.value;
    this.setState({
      selectedFilter: filter
    }, () => this.sortWishlistAlpha());
  }

  handleKitFilterChange(e) {
    const filter = e.target.value;
    this.setState({
      selectedFilter: filter
    }, () => this.sortKitAlpha());
  }


  addToList(
    productId,
    productList,
    productName,
    productBrand,
    productImage,
    productLink,
    productType
  ) {
    let dbRefUser = firebase
      .database()
      .ref(`users/${this.state.currentUserId}`);
    let dbRefList = firebase
      .database()
      .ref(`users/${this.state.currentUserId}/${productList}/${productId}`);

    const newListItem = {
      id: productId,
      name: productName,
      image_link: productImage,
      brand: productBrand,
      product_link: productLink,
      product_type: productType
    };
    dbRefList.set(newListItem);
  }

  sortProductsAlpha() {
    const productsToSort = this.state.productsToDisplay;
    const attr = this.state.selectedFilter;

    function compare(a, b) {
      const categoryA = (a[attr] !== null && a[attr] !== undefined) ? a[attr].toUpperCase() : '';
      const categoryB = (b[attr] !== null && b[attr] !== undefined) ? b[attr].toUpperCase() : '';

      let comparison = 0;
      if (categoryA > categoryB) {
          comparison = 1;
      } else if (categoryA < categoryB) {
          comparison = -1;
      }
      return comparison;
    }

    let sorted = productsToSort.sort(compare);
    this.setState({
      productsToDisplay: sorted,
      selectedFilter: ''
    });
  }

  sortWishlistAlpha() {
    const productsToSort = this.state.currentUserWishlist;
    const attr = this.state.selectedFilter;

    function compare(a, b) {
      const categoryA = (a[attr] !== null && a[attr] !== undefined) ? a[attr].toUpperCase() : '';
      const categoryB = (b[attr] !== null && b[attr] !== undefined) ? b[attr].toUpperCase() : '';

      let comparison = 0;
      if (categoryA > categoryB) {
          comparison = 1;
      } else if (categoryA < categoryB) {
          comparison = -1;
      }
      return comparison;
    }

    let sorted = productsToSort.sort(compare);
    this.setState({
      currentUserWishlist: sorted,
      selectedFilter: ''
    });
  }

  sortKitAlpha() {
    const productsToSort = this.state.currentUserKit;
    const attr = this.state.selectedFilter;

    function compare(a, b) {
      const categoryA = (a[attr] !== null && a[attr] !== undefined) ? a[attr].toUpperCase() : '';
      const categoryB = (b[attr] !== null && b[attr] !== undefined) ? b[attr].toUpperCase() : '';

      let comparison = 0;
      if (categoryA > categoryB) {
          comparison = 1;
      } else if (categoryA < categoryB) {
          comparison = -1;
      }
      return comparison;
    }

    let sorted = productsToSort.sort(compare);
    this.setState({
      currentUserKit: sorted,
      selectedFilter: ''
    });
  }


  render() {
    return <Router>
        <div className="app">
          <Header 
            loggedIn={this.state.loggedIn} 
            loginWithGoogle={this.loginWithGoogle} 
            logout={this.logout} 
            productTypes={this.state.productTypes} 
            showSecondaryNav={this.showSecondaryNav}
            secondaryNavVisible={this.state.secondaryNavVisible}
          />
          <div className="app--inner">
          <Route path="/" exact render={() => <div className="home__outer">
                <Home 
                  handleSubmit={this.handleSubmit} 
                  selectedProductType={this.state.selectedProductType} 
                  handleChange={this.handleChange} 
                  productTypes={this.state.productTypes} 
                  isProductTypeSelected={this.state.isProductTypeSelected} 
                  setCategory={this.setCategory} 
                  selectedProductCategories={this.state.selectedProductCategories} 
                  products={this.state.productsToDisplay} 
                  currentUserId={this.state.currentUserId} 
                  button1Text={"Add to wishlist"} 
                  button1Handler={this.addToList} 
                  button2Text={"Add to kit"} 
                  button2Handler={this.addToList} 
                  loggedIn={this.state.loggedIn} 
                />
                <HomePageHeading 
                  text={this.state.homePageHeadline} 
                  selectedFilter={this.state.selectedFilter} 
                  handleFilterChange={this.handleFilterChange} 
                  arrayToFilter={this.state.productsToDisplay}
                />
                <ProductList 
                  products={this.state.productsToDisplay} 
                  currentUserId={this.state.currentUserId} 
                  button1Text={"Add to wishlist"} 
                  button1Handler={this.addToList} 
                  button1Context={"wishList"} 
                  button2Text={"Add to kit"} 
                  button2Handler={this.addToList} 
                  button2Context={"kit"} 
                  loggedIn={this.state.loggedIn} 
                  loginWithGoogle={this.loginWithGoogle} 
                />
              </div>} />
          <Route path="/my-wishlist" render={() => <PageHeading text={"My Wishlist"} selectedFilter={this.state.selectedFilter} handleFilterChange={this.handleWishlistFilterChange} />} />

          <Route path="/my-wishlist" exact render={() => <ProductList products={this.state.currentUserWishlist} currentUserId={this.state.currentUserId} button1Text={"Remove from wishlist"} button1Handler={this.removeProduct} button1Context={"wishList"} button2Text={"Add to kit"} button2Handler={this.addToList} button2Context={"kit"} loggedIn={this.state.loggedIn} />} />

          <Route path="/my-kit" render={() => <PageHeading text={"My Kit"} selectedFilter={this.state.selectedFilter} handleFilterChange={this.handleKitFilterChange} arrayToFilter={this.state.currentUserKit} />} />

          <Route path="/my-kit" exact render={() => <div className="my-kit">
                <ProductList products={this.state.currentUserKit} currentUserId={this.state.currentUserId} button1Text={"Add to wishlist"} button1Handler={this.addToList} button1Context={"wishList"} button2Text={"Remove from kit"} button2Handler={this.removeProduct} button2Context={"kit"} loggedIn={this.state.loggedIn} />
              </div>} />

        <Route path="/products/:productType" render={(props) => <ProductType selectedFilter={this.state.selectedFilter} handleFilterChange={this.handleKitFilterChange} loggedIn={this.state.loggedIn} currentUserId={this.state.currentUserId} button1Text={"Add to wishlist"} button1Handler={this.addToList} button1Context={"wishList"} button2Text={"Add to kit"} button2Handler={this.addToList} button2Context={"kit"} loginWithGoogle={this.loginWithGoogle} {...props} />} />
          </div>
          <Footer />
        </div>
      </Router>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
