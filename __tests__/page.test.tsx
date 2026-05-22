import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}))

test('Page renders heading', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
})
