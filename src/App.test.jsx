import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event';
import Card from './components/Card'
import Input from './components/Input'
import NavigationBar from './components/Navbar';
import Button from './components/Button';
import Layout from './Layout'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import Cart from './components/Cart'

describe.skip('Data fetching works correctly', () => {
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

describe.skip('Cards created and displayed correctly', () => {
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

describe.skip('Input component is controlled', () => {
  it('Updates value on change', async () => {
    let user = userEvent.setup()
    render(<Input id='test-input' placeholder='test-input' type='text'/>)
    let input = screen.getByPlaceholderText('test-input')
    await user.type(input, 'Test value')
    expect(await screen.findByDisplayValue('Test value')).toBeInTheDocument()
  })
})

describe.skip('Navigation bar rendered correctly', () => {
  it('Displays the site\'s webpage links', () => {
    render(<NavigationBar addedProducts={[]}/>)
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Cart/i)).toBeInTheDocument()
  })

  it('Displays no message if no products added', () => {
    render(<NavigationBar addedProducts={[]} />)
    expect(screen.queryByText(/Products added to cart/i)).not.toBeInTheDocument()
  })

  it('Displays correct number of products added to cart', () => {
    render(<NavigationBar addedProducts={[
      'Test product 1', 'Test product 2']}/>)
    
    expect(screen.getByText('Products added to cart: 2')).toBeInTheDocument()
  })
})

describe('Button component works correctly', () => {
  it('Displays the right text', () => {
    render(<Button text='Test Button'/>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('Onclick event handler works correctly', async () => {
    let testFn = vi.fn((a, b) => a + b);
    let user = userEvent.setup()
    render(<Button onClick={testFn} text='Test Button'/>)
    await user.click(screen.getByText('Test Button'))
    expect(testFn).toHaveReturned(3)
  })
})

describe('Product buttons work correctly', () => {
  let mockedFetch
  beforeEach(() => {
    mockedFetch = vi.fn()
    vi.stubGlobal('fetch', mockedFetch)
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

  it('Adds product to cart', async () => {
    let user = userEvent.setup()    
    render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<App />} />
          <Route path='/cart' element={<Cart />}/>
        </Route>
      </Routes>
    </MemoryRouter>
    )
    let btns = await screen.findAllByRole('button', {name: /Add to cart/i})
    await user.click(btns[0])
    expect(screen.getByText(/Products added to cart: 1/i)).toBeInTheDocument()

    let link = screen.getByRole('link', {name: /Cart/i})
    await user.click(link)
    screen.debug()
    expect(screen.getByText(/Products added to cart/i)).toBeInTheDocument()
  })
})