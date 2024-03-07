import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import GlobalStyle from './GlobalStyle'

const FooterContainer = styled.div`
  margin-top: 30px;
`

const Thanks = styled.div`
  font-size: 1.125em;

  svg {
    display: inline-block;
    position: relative;
    width: 16px;
    margin-right: 4px;
    color: var(--color-primary-0);
  }
`

const Info = styled.div`
  position: running(footer);
  margin-top: -25px;
  font-size: 0.75em;
  color: #ccc;

  span {
    padding: 0 5px;
    color: black;

    &:last-child {
      padding-right: 0;
    }
  }
`

// The `content` here references `position` from the FooterContainer
const FooterPlacement = createGlobalStyle`
  @page {
    @bottom-left {
      content: element(footer);
    }
  }
`


const Footer = () => (
  <FooterContainer>
    <FooterPlacement />
    <Info>
      <span>hello@useanvil.com</span>|{' '}
      <span>555 444 6666</span> |{' '}
      <span>useanvil.com</span>
    </Info>
    <Thanks>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
      </svg>
      <span>Thank you!</span>
    </Thanks>
  </FooterContainer>
)

export default Footer