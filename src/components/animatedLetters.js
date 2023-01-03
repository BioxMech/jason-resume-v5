import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSpan = styled.span`
  .word {
    display: inline-block;
  }

  .text-animate-hover {
    min-width: 10px;
    display: inline-block;
    animation-fill-mode: both;

    &:hover {
      animation: rubberBand 1s;
      color: var(--green);
    }
  }

  @keyframes rubberBand {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1.3, 0.6);
    }

    50% {
      transform: scale(1.1, 0.9);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

const AnimatedLetters = ({ wordArr }) => (
  <StyledSpan>
    {wordArr.map((word, idx) => {
      const strArray = word.split('');

      return (
        <div key={word + idx} className="word">
          {strArray.map((char, i) => (
            <span key={char + i} className={`text-animate-hover _${i + idx}`}>
              {char}
            </span>
          ))}
            &nbsp;
        </div>
      );
    })}
  </StyledSpan>
);

AnimatedLetters.propTypes = {
  wordArr: PropTypes.object,
};

export default AnimatedLetters;
