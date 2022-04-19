/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { axe } from 'jest-axe'
import { act } from 'react-dom/test-utils'

it('will render App page', () => {
  render(<App />)
  const inviteButton = screen.getByRole('button')
  expect(inviteButton).toBeInTheDocument()
  expect(inviteButton).toHaveTextContent('Request an invite')

  expect(screen.getByRole('heading')).toHaveTextContent(
    'A better way to enjoy every day.'
  )
})

it('will open modal and show form with invite button is click', async () => {
  render(<App />)
  const inviteButton = screen.getByRole('button')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  await userEvent.click(inviteButton)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  expect(screen.getAllByRole('textbox')).toHaveLength(3)
})
describe('when form submission is successful', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(new Response())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('will show success message', async () => {
    render(<App />)
    const inviteButton = screen.getByRole('button')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(inviteButton)

    const nameInput = screen.getByPlaceholderText('Full name')
    const emailInput = screen.getByPlaceholderText('Email', { exact: true })
    const confirmEmailInput = screen.getByPlaceholderText('Confirm email', {
      exact: true,
    })

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(confirmEmailInput).toHaveValue('')

    await userEvent.type(nameInput, 'John Smith')
    await userEvent.type(emailInput, 'test@123.com')
    await userEvent.type(confirmEmailInput, 'test@123.com')

    await act(() => {
      userEvent.click(screen.getByText('Send'))
    })
    expect(screen.queryByRole('dialog')).toHaveTextContent('All Done!')
  })
})

describe('when form submission failed', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValue(new Error('oops, Something has happened'))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('will show failed message', async () => {
    render(<App />)
    const inviteButton = screen.getByRole('button')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(inviteButton)

    const nameInput = screen.getByPlaceholderText('Full name')
    const emailInput = screen.getByPlaceholderText('Email', { exact: true })
    const confirmEmailInput = screen.getByPlaceholderText('Confirm email', {
      exact: true,
    })

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(confirmEmailInput).toHaveValue('')

    await userEvent.type(nameInput, 'John Smith')
    await userEvent.type(emailInput, 'test@123.com')
    await userEvent.type(confirmEmailInput, 'test@123.com')

    await act(() => {
      userEvent.click(screen.getByText('Send'))
    })
    expect(screen.queryByRole('dialog')).toHaveTextContent(
      'oops, Something has happened'
    )
  })
})

it('passes accesibility check', async () => {
  const { container } = render(<App />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
