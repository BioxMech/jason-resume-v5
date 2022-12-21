import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }

  ul.certifications-list {
    display: grid;
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'NestJS',
    'Node.js',
    'Python',
    'MongoDB',
    'AWS',
  ];

  const certifications = [
    {
      name: 'AWS Solution Architecture',
      link: 'https://www.credly.com/badges/3c46a6e0-342e-40f4-a585-b20796201251?source=linked_in_profile',
    },
    {
      name: 'AWS Cloud Practicitioner',
      link: 'https://www.credly.com/badges/74ba73a5-9ab7-43bb-a706-f1d6644cce91/linked_in_profile',
    },
    {
      name: 'Java Foundation Associate',
      link: 'https://www.credly.com/badges/5377cdc8-f4ae-4ecc-8bd2-af193589073a',
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Jason and I enjoy creating things that live on
              the internet. My interest in full-stack development, essentially
              the Frontend, Backend and Infrastructure development. I started
              back in 2019 when I decided to try building websites using HTML
              &amp; CSS. I practically built a e-commerce website — turns out
              hacking together a custom payment page taught me a lot!
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://www.tech.gov.sg/capability-centre-dsaid">
                a public sector agency
              </a>
              ,{' '}
              <a href="https://www.viki.com/">
                a streaming platform corporation
              </a>
              ,{' '}
              <a href="https://www.ocbc.com/group/gateway.page/  ">
                a huge financial institution
              </a>
              , and <a href="https://wedbio.com/">a startup</a>.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>

          <div style={{ marginTop: '20px' }}>
            Also, here are my certifications:
          </div>

          <ul className="certifications-list">
            {certifications &&
              certifications.map((certification, i) => (
                <li key={i}>
                  <p>
                    <a href={certification.link}>{certification.name}</a>
                  </p>
                </li>
              ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
