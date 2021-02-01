import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (
    <div>
      <img className={className} src="https://fontmeme.com/permalink/210201/6e3489b55160a6850cebf3a67a9067cf.png" alt="Logo Quiz" />
      <img className={className} src="https://fontmeme.com/permalink/210201/1641f4cde68f51a531fdd77a284daf89.png" alt="logo" />
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
