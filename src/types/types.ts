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
  doSearch: (searchValue: string) => void;
};

export type CardsProps = {
  cards: { name: string; description: string; image: string; age: string }[];
};

export type CardItemProps = {
  name: string;
  description: string;
  image: string;
  age: string;
};
