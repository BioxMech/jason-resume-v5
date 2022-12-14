import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';
import AnimatedLetters from '../animatedLetters';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Jason Chew.</h2>;
  const three = (
    <h3 className="big-heading">
      <AnimatedLetters
        wordArr={['Develop', 'apps', 'for', 'the', 'web.']}
        idx={0}
      />
    </h3>
  );
  const four = (
    <>
      <p>
        I'm an aspiring software engineer, specializing in full-stack
        development (Frontend, Backend and Infrastructure - mainly in{' '}
        <a
          href="https://www.credly.com/badges/3c46a6e0-342e-40f4-a585-b20796201251"
          target="_blank"
          rel="noreferrer"
        >
          AWS
        </a>
        ) Currently, I'm focused on building accessible, human-centered products
        at{' '}
        <a
          href="https://www.tech.gov.sg/capability-centre-dsaid"
          target="_blank"
          rel="noreferrer"
        >
          Govtech
        </a>
        .
      </p>
    </>
  );
  // const five = (
  //   <a
  //     className="email-link"
  //     href=""
  //     target="_blank"
  //     rel="noreferrer">
  //     Check out this linK!
  //   </a>
  // );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
