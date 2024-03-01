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
