import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('Data fetching works correctly', () => {
  let mockedFetch
  beforeEach(() => {
    mockedFetch = vi.fn()
    vi.stubGlobal('fetch', mockedFetch)
    mockedFetch.mockResolvedValueOnce({
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
})