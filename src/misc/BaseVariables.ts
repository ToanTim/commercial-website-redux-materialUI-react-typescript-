interface RouteLinkText {
  shortLink: string;
  fullLink: string;
}

const basedLink = "http://localhost:3000/";

export const websiteRouterList: { [key: string]: RouteLinkText } = {
  //static routes
  home: {
    shortLink: "/",
    fullLink: basedLink,
  },
  authentication: {
    shortLink: "/authentication",
    fullLink: basedLink + "/authentication",
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
};

interface DataLinkText {
  getAll: string;
  getProductById: string;
  getAll2?: string;
  getAll3?: string;
  getAll4?: string;
}

export const DataFetchLinkList: { [key: string]: DataLinkText } = {
  dataProduct: {
    getAll: "https://api.escuelajs.co/api/v1/products",
    getProductById: "https://api.escuelajs.co/api/v1/products/",
  },
  dataCategory: {
    getAll: "https://api.escuelajs.co/api/v1/categories",
    getProductById: "https://api.escuelajs.co/api/v1/products/",
  },
};
