import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { SignInButton} from '.'

jest.mock('next-auth/react')

describe('SignInButton component', () => {
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
          data: null
        } as any);

        render(<SignInButton />)
    
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })
    
    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: {
              user: { name: "John Doe", email: "john.doe@example.com", image: "https://github.com/fersdev.png" },
              expires: "fake-expires",
            }
          } as any);

        render(<SignInButton />)
    
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

})