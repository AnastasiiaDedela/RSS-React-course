export type ApiPerson = {
  name: string;
  birth_year: string;
  url: string;
};

export type Person = {
  name: string;
  description: string;
  image: string;
  age: string;
};

export type SearchValue = {
  searchValue: string;
};

export type SearchProps = {
  handleRequest: (searchValue: string, page: number) => void;
  currentPage: number;
};

export type Hero = {
  image: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};
