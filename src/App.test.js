import { render, screen } from '@testing-library/react';
import MainPage from './components/mainpage'

test('keywordDocker', () => {
  render(<MainPage />)
  expect(screen.getByText("Docker")).toBeInTheDocument()
})

test('keyworkGithub', () => {
  render(<MainPage />)
  expect(screen.getByText("Github")).toBeInTheDocument()
})

test('keyworkSwagger', () => {
  render(<MainPage />)
  expect(screen.getByText("Swagger")).toBeInTheDocument()
})