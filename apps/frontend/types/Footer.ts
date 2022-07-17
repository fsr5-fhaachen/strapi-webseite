export interface FooterResponse {
  data: Footer;
}

export interface Footer {
  attributes: {
    items: FooterItem[];
  };
}
export interface FooterItem {
  id: number;
  title: string;
  to: string;
}
