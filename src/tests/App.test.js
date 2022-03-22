import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test App.js', () => {
  it('Tem o links de Home ', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(homeTitle).toBeInTheDocument();
  });
  it('Tem o links de About ', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    // const { pathname } = history.location;
    // expect(pathname).toBe('/about');
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Tem o links de Favorite ', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteTitle = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(favoriteTitle).toBeInTheDocument();
  });
  it('Tem o links de not found ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pagenotfound');
    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
