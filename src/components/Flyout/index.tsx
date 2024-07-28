import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedHeroes } from '../../redux/slices/selectedHeroesSlice';
import { RootState } from '../../redux/store';
import { saveAs } from 'file-saver';
import styles from './Flyout.module.css';
// import { RootState } from '@reduxjs/toolkit/query';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedHeroes = useSelector((state: RootState) => {
    console.log('State.heroes:', state); // Debugging line
    return state.selectedHeroes.selectedHeroes;
  });

  if (!Array.isArray(selectedHeroes) || selectedHeroes.length === 0)
    return null;

  const handleUnselectAll = () => {
    dispatch(clearSelectedHeroes());
  };

  const handleDownload = () => {
    const csvData = selectedHeroes.map((hero) => ({
      name: hero.name,
      height: hero.height,
      mass: hero.mass,
      hair_color: hero.hair_color,
      skin_color: hero.skin_color,
      eye_color: hero.eye_color,
      birth_year: hero.birth_year,
      gender: hero.gender,
      homeworld: hero.homeworld,
      url: hero.url,
    }));
    const csvContent = [
      [
        'Name',
        'Height',
        'Mass',
        'Hair Color',
        'Skin Color',
        'Eye Color',
        'Birth Year',
        'Gender',
        'Homeworld',
        'URL',
      ],
      ...csvData.map((hero) => [
        hero.name,
        hero.height,
        hero.mass,
        hero.hair_color,
        hero.skin_color,
        hero.eye_color,
        hero.birth_year,
        hero.gender,
        hero.homeworld,
        hero.url,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedHeroes.length}_heroes.csv`);
  };

  return (
    <div className={styles.flyout}>
      <span>{selectedHeroes.length} items are selected</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
