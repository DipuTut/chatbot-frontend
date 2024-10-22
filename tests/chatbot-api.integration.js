// src/components/Chatbot.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Chatbot from './Chatbot';

test('renders Chatbot component', () => {
  const { getByPlaceholderText, getByText } = render(<Chatbot />);
  expect(getByPlaceholderText('Schreibe eine Nachricht...')).toBeInTheDocument();
});

test('sends a message and receives a response', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ reply: 'Hallo! Wie kann ich Ihnen helfen?' }),
    })
  );

  const { getByPlaceholderText, getByText } = render(<Chatbot />);
  
  fireEvent.change(getByPlaceholderText('Schreibe eine Nachricht...'), { target: { value: 'Hallo' } });
  fireEvent.click(getByText('Senden'));

  expect(await getByText('user: Hallo')).toBeInTheDocument();
  expect(await getByText('bot: Hallo! Wie kann ich Ihnen helfen?')).toBeInTheDocument();
});
