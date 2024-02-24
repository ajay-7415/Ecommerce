import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero tittle='about' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='about' />
        <article>
          <div className='tittle'>
            <h2>our story</h2>
            <div className='underline'></div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
              consequatur eligendi nulla sequi, repellendus iusto maxime cumque
              fuga vel similique suscipit perspiciatis minima dolorem architecto
              libero, odit impedit, magnam eius?
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
