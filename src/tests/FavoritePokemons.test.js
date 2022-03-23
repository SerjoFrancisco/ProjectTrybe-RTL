import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test About.js', () => {
  it('Não retorna nada se não tiver favoritos ', () => {
    renderWithRouter(<FavoritePokemons />);
    const title = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(title).toBeInTheDocument();
    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  it('retorna todos os pokemons favoritos', () => {
    localStorage.setItem('favoritePokemonIds', '[25, 4]');
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
