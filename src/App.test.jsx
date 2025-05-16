import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event';
import Card from './components/Card'

describe('Data fetching works correctly', () => {
  let mockedFetch
  beforeEach(() => {
    mockedFetch = vi.fn()
    vi.stubGlobal('fetch', mockedFetch)
    mockedFetch.mockResolvedValue({
      status: 200,
      json: async () => [{ id: 1, title: 'Test Product 1'}]
    })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('Renders successfully fetched data', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })
  })

  it('Displays a loading screen', () => {
    render(<App />)
    expect(screen.getByText('Hang tight while we fetch the latest products.')).toBeInTheDocument()
  })

  it('Displays an error on data fetching errors', async () => {
    mockedFetch.mockResolvedValue({
      status: 400
    })
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Oops! An error occured while fetching products.')).toBeInTheDocument()
    })
  })

  describe('Data fetching retry works', () => {
    beforeEach(() => {
      mockedFetch.mockResolvedValueOnce({
        status: 400
      })
    })

    it('Displays a retry button', async () => {
      render(<App />)
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /Retry/i})).toBeInTheDocument()
      })
    })

    it('Retries data fetching on retry button click', async () => {
      mockedFetch.mockResolvedValueOnce({
        status: 200,
        json: async () => [{ id: 1, title: 'Test Product 1'}]
      })
      let user = userEvent.setup()
      render(<App />)
      let btn = await screen.findByRole('button', {name: /Retry/i})
      await user.click(btn)      
      let product = await screen.findByText('Test Product 1')
      expect(product).toBeInTheDocument()
    })

  })
})

describe('Cards created and displayed correctly', () => {
  beforeEach(() => {
    let mockedFetch;
    mockedFetch = vi.fn();
    vi.stubGlobal('fetch', mockedFetch);
    mockedFetch.mockResolvedValue({
      status: 200,
      json: () => [{
        id: 1,
        image: './assets/kees-streefkerk-Adl90-aXYwA-unsplash.jpg',
        title: 'Test Product 1'
      }]
    })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('Displays card with the right elements', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Number of items')).toBeInTheDocument()
      expect(screen.getByText(/Test Product 1/)).toBeInTheDocument()
    })
  })
})