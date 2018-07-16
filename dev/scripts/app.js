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
import HomePage from './HomePage';
import { shuffle, randoNum } from './helpers';
import Wishlist from './Wishlist';
import Kit from './Kit';


const config = {
  apiKey: "AIzaSyCqf-B49wkmM2dxSkJoOR1uwF0lfypU-vw",
  authDomain: "kithub-aa9f5.firebaseapp.com",
  databaseURL: "https://kithub-aa9f5.firebaseio.com",
  projectId: "kithub-aa9f5",
  storageBucket: "",
  messagingSenderId: "321165294365"
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
      // displayAddToWishlist: true,
      // displayAddToKit: true,
      // displayRemove: true,
      currentUserWishlist: [],
      currentUserKit: [],
      featuredProducts: [],
      homepageHeadline: "Featured Products",
      selectedFilter: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentDidMount() {
    this.setFeaturedProducts();
    this.setUser();
  }

  addToList(productId, productList, product) {
    let dbRef = firebase
      .database()
      .ref(`users/${this.state.currentUserId}/${productList}/${productId}`);

    const newListItem = {
      id: productId,
      name: product.name,
      image_link: product.image_link,
      brand: product.brand,
      product_link: product.product_link,
      product_type: product.product_type
    };
    dbRef.set(newListItem);
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
      homepageHeadline: headline,
      selectedProductType: '',
      selectedProductCategories: [],
      isProductTypeSelected: false
    });
  }

  getProductsByIds(array) {
    const featuredProducts = [];

    array.map(arrItem => {
      const productId = arrItem;

      axios({
        url: `https://makeup-api.herokuapp.com/api/v1/products/${productId}.json`,
        method: "GET",
        responseType: "json"
      }).then(res => {
        const product = res.data;
        const matches = [];
        for (let i = 0; i < featuredProducts.length; i++) {
          if (featuredProducts[i].id === productId) {
            matches.push(productId);
          }
        }
        if (matches.length === 0) {
          featuredProducts.push(product);
        }
      })

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

  handleSubmit(e) {
    e.preventDefault();
    this.getProducts();
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

  removeProduct(productId, productList, ...Args) {
    firebase
      .database()
      .ref(`users/${this.state.currentUserId}/${productList}/${productId}`)
      .remove();
  }

  setCategory(e) {
    this.setState({
      [e.target.name]: e.target.value,
      categoryToDisplay: e.target.value
    });
  }

  setFeaturedProducts() {
    const featuredProductsArray = [];
    const numProducts = 930;
    for (let i = 0; i < 12; i++) {
      let random = randoNum(numProducts);
      featuredProductsArray.push(random);
    }
    const shuffledProducts = shuffle(featuredProductsArray);
    const products = this.getProductsByIds(shuffledProducts);
    this.setState({ homepageHeadline: "Featured Products" });
  }

  setUser() {
    this.dbRef = firebase.database().ref("users");
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
            let loggedInUser = { userId: user.uid, userName: user.displayName };
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

  render() {
    return (
      <Router>
        <div className="app">
          <Header
            loggedIn={this.state.loggedIn}
            loginWithGoogle={this.loginWithGoogle}
            logout={this.logout}
          />
          <main className="app--inner">
            <Route
              path="/"
              exact
              render={() => (
                <HomePage
                  button1Handler={this.addToList}
                  button2Handler={this.addToList}
                  currentUserId={this.state.currentUserId}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  isProductTypeSelected={this.state.isProductTypeSelected}
                  loggedIn={this.state.loggedIn}
                  loginWithGoogle={this.loginWithGoogle}
                  products={this.state.productsToDisplay}
                  productTypes={this.state.productTypes}
                  selectedProductType={this.state.selectedProductType}
                  selectedProductCategories={
                    this.state.selectedProductCategories
                  }
                  setCategory={this.setCategory}
                  text={this.state.homepageHeadline}
                />
              )}
            />

            <Route
              path="/my-wishlist"
              exact
              render={() => (
                <Wishlist
                  products={this.state.currentUserWishlist}
                  button1Handler={this.removeProduct}
                  button2Handler={this.addToList}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />

            <Route
              path="/my-kit"
              exact
              render={() => (
                <Kit
                  products={this.state.currentUserKit}
                  button1Handler={this.addToList}
                  button2Handler={this.removeProduct}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
