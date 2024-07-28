import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedHeroesReducer, {
  toggleSelectHero,
} from '../../redux/slices/selectedHeroesSlice';
import CardItem, { CardItemProps } from './index';
import { Hero } from '../../types/types';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, expect, it, describe, vi } from 'vitest';

describe('CardItem Component', () => {
  const hero: Hero = {
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
  };

  const initialState = {
    selectedHeroes: {
      selectedHeroes: [hero],
    },
  };

  const store = configureStore({
    reducer: {
      selectedHeroes: selectedHeroesReducer,
    },
    preloadedState: initialState,
  });

  const props: CardItemProps = {
    hero,
    isSelected: true,
  };

  beforeEach(() => {
    store.dispatch = vi.fn();
  });

  it('renders correctly', () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Routes>
            <Route path="/search/:page" element={<CardItem {...props} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Hero 1')).toBeInTheDocument();
    expect(getByAltText('Hero 1')).toHaveAttribute('src', hero.image);
  });

  it('handles selection correctly', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Routes>
            <Route path="/search/:page" element={<CardItem {...props} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(toggleSelectHero(hero));
  });

  it('handles navigation correctly', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Routes>
            <Route path="/search/:page" element={<CardItem {...props} />} />
            <Route
              path="/search/:page/details/:userIndex"
              element={<div>Details Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const image = getByAltText('Hero 1');
    fireEvent.click(image);
  });

  it('passes correct props', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Routes>
            <Route path="/search/:page" element={<CardItem {...props} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const cardItem = getByTestId('card-item');
    expect(cardItem).toHaveAttribute('data-selected', 'true');
  });
});
