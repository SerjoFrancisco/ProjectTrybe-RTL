import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test About.js', () => {
  it('Tem a imagem e titulo certos', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
