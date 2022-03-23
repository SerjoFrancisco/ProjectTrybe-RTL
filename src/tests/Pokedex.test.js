import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('Test About.js', () => {
  it('Tem o titulo certo', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
  it('Renderiza os pokemons certos, um por vez', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      const details = screen.getAllByRole('link', { name: /more details/i });
      expect(details).toHaveLength(1);
      userEvent.click(button);
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Filtra os tipos e reseta os filtros', () => {
    renderWithRouter(<App />);
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const noFilterBtn = screen.getByRole('button', { name: 'All' });
    for (let i = 0; i < types.length; i += 1) {
      userEvent.click(filterBtn[i]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(types[i]);
      expect(filterBtn[i]).toHaveTextContent(types[i]);
      userEvent.click(nextBtn);
      expect(filterBtn[i]).toHaveTextContent(types[i]);
      userEvent.click(nextBtn);
      expect(filterBtn[i]).toHaveTextContent(types[i]);
      expect(noFilterBtn).toBeInTheDocument();
    }
    userEvent.click(noFilterBtn);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
