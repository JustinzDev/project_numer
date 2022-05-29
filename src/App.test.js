import { render, screen } from '@testing-library/react'
import MainPage from './components/mainpage'

test('keywordDocker', () => {
  render(<MainPage />)
  expect(screen.getByText("Docker")).toBeInTheDocument()
})

test('keywordGithub', () => {
  render(<MainPage />)
  expect(screen.getByText("Github")).toBeInTheDocument()
})

test('keywordSwagger', () => {
  render(<MainPage />)
  expect(screen.getByText("Swagger")).toBeInTheDocument()
})

test('keywordDatabase', () => {
  render(<MainPage />)
  expect(screen.getByText(/Database MongoDB/i)).toBeInTheDocument()
})