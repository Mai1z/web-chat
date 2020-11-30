import styled from 'styled-components'

export const SideNavContainer = styled.nav`
  max-width: 100px;
  height: 100vh;
  padding: 20px;
  border-right: 2px solid ${({ theme }) => theme.medium};
  .ava {
    width: 100%;
    border-radius: 50%;
  }
  svg {
    color: gray;
  }
`