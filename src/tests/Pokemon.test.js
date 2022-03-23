import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('Test About.js', () => {
  it('Renderiza os cards de pokemon corretamente', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const { averageWeight } = pokemon;
      const img = screen.getByRole('img');
      const pkmWeight = screen.getByTestId('pokemon-weight');
      const link = screen.getByRole('link', { name: /More details/i });
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokemon.type);
      expect(pkmWeight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
      expect(img).toHaveAttribute('src', pokemon.image);
      expect(img).toHaveAttribute('alt', `${pokemon.name} sprite`);
      expect(link.getAttribute('href')).toBe(`/pokemons/${pokemon.id}`);
      userEvent.click(button);
    });
  });
  it('Mostra os pokemons favoritos corretamente', () => {
    localStorage.setItem('favoritePokemonIds', '[25, 4]');
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const img = screen.getAllByRole('img');
      if (pokemon.name === 'Pikachu' || pokemon.name === 'Charmander') {
        expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
        expect(img[1]).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
      } else {
        expect(img).toHaveLength(1);
      }
      userEvent.click(button);
    });
  });
});
