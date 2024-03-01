interface RouteLinkText {
  shortLink: string;
  fullLink: string;
}

const basedLink = "http://localhost:3000/";

export const websiteRouterList: { [key: string]: RouteLinkText } = {
  home: {
    shortLink: "/",
    fullLink: basedLink,
  },
  product: {
    shortLink: "/products",
    fullLink: basedLink + "/products",
  },
  authentication: {
    shortLink: "/authentication",
    fullLink: basedLink + "/authentication",
  },
};

interface DataLinkText {
  getAll: string;
  getAll1?: string;
  getAll2?: string;
  getAll3?: string;
  getAll4?: string;
}

export const DataFetchLinkList: { [key: string]: DataLinkText } = {
  dataProduct: {
    getAll: "https://api.escuelajs.co/api/v1/products",
  },
  dataCategory: {
    getAll: "https://api.escuelajs.co/api/v1/categories",
  },
};
