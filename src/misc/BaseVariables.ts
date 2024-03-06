const basedLink = "http://localhost:3000/";

export const websiteRouterList: { [key: string]: TextType } = {
  //static routes
  home: {
    shortLink: "/",
    fullLink: basedLink,
  },
  authentication: {
    shortLink: "/authentication",
    fullLink: basedLink + "/authentication",
  },
  cart: {
    shortLink: "/cart",
    fullLink: basedLink + "/cart",
  },

  //dynamic routes
  product: {
    //?page=
    shortLink: "/products?page=",
    fullLink: basedLink + "/products?page=",
  },
  productDetailById: {
    //:id
    shortLink: "/products/",
    fullLink: basedLink + "/products/",
  },
  user: {
    //:id
    shortLink: "/users/",
    fullLink: basedLink + "/users/",
  },
};

interface TextType {
  [key: string]: string;
}

export const DataFetchLinkList: { [key: string]: TextType } = {
  dataProduct: {
    getAll: "https://api.escuelajs.co/api/v1/products",
    getProductById: "https://api.escuelajs.co/api/v1/products/",
  },
  dataCategory: {
    getAll: "https://api.escuelajs.co/api/v1/categories",
    getProductById: "https://api.escuelajs.co/api/v1/products/",
  },
  authentication: {
    //POST
    login: "https://api.escuelajs.co/api/v1/auth/login",
    register: "https://api.escuelajs.co/api/v1/users/",
    emailIsAlreadyAvaiable:
      "https://api.escuelajs.co/api/v1/users/is-available",
    userProfile: "https://api.escuelajs.co/api/v1/auth/profile",

    //PUT
    updateProfile: "https://api.escuelajs.co/api/v1/users/", //+userId
  },
};

export const DataBroswerName: { [key: string]: TextType } = {
  authenticationStorageToken: {
    keyName: "integrify_token",
  },
  authenticationCurrentUser: {
    keyName: "integrify_current_user_data",
  },
  isLoggedIn: {
    keyName: "integrify_isLoggedIn",
  },
  cartData: {
    keyName: "integrify_cart_data",
  },
};
