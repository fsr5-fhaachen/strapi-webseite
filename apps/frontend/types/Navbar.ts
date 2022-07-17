export interface NavbarResponse {
  data: Navbar;
}

export interface Navbar {
  attributes: {
    items: NavbarItem[];
  };
}
export interface NavbarItem {
  id: number;
  title: string;
  to: string;
}
