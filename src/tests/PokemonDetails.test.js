import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('Test About.js', () => {
  it('Testa se os atributos corretos são renderizados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const title = screen.getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(title).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { name: /Summary/i });
    expect(summaryTitle).toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });
  it('Testa se as localizações certas são mostradas', () => {
    const { foundAt } = pokemons[0];
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const title = screen.getByRole(
      'heading', { name: `Game Locations of ${pokemons[0].name}` },
    );
    expect(title).toBeInTheDocument();
    const images = screen.getAllByAltText(`${pokemons[0].name} location`);
    for (let i = 0; i < images.length; i += 1) {
      expect(images[i]).toHaveAttribute('src', foundAt[i].map);
    }
  });
  it('Testa se adiciona o pokemon aos favoritos corretamente', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(checkBox);
    const star = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(star).toBeInTheDocument();
    userEvent.click(checkBox);
    expect(star).not.toBeInTheDocument();
  });
});
