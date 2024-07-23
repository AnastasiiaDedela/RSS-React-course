import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedHeroesReducer from '../../redux/slices/selectedHeroesSlice'; // Update the path to your actual slice
import CardsList from './index';
import { Hero } from '../../types/types';
import { beforeEach, expect, it, describe } from 'vitest';

describe('CardsList Component', () => {
  const store = configureStore({
    reducer: {
      selectedHeroes: selectedHeroesReducer,
    },
  });

  const heroes: Hero[] = [
    {
      url: 'https://example.com/hero1',
      name: 'Hero 1',
      image: 'https://example.com/hero1.jpg',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
    },

    {
      url: 'https://example.com/hero2',
      name: 'Hero 2',
      image: 'https://example.com/hero2.jpg',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
    },
    // Add more heroes if necessary
  ];

  const selectedHeroes = [{ name: 'Hero1', url: 'url1' }];

  beforeEach(() => {
    store.dispatch({
      type: 'selectedHeroes/setSelectedHeroes',
      payload: selectedHeroes,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CardsList heroes={heroes} />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Results Found :')).toBeInTheDocument();
  });

  it('renders the correct number of CardItem components', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CardsList heroes={heroes} />
        </MemoryRouter>
      </Provider>,
    );

    expect(getAllByTestId('card-item')).toHaveLength(heroes.length);
  });

  it('passes correct isSelected prop to CardItem components', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CardsList heroes={heroes} />
        </MemoryRouter>
      </Provider>,
    );

    const cardItems = getAllByTestId('card-item');
    cardItems.forEach((cardItem, index) => {
      const isSelected = selectedHeroes.some(
        (h) => h.url === heroes[index].url,
      );
      expect(cardItem).toHaveAttribute('data-selected', isSelected.toString());
    });
  });
});
