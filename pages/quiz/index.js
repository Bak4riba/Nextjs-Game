/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import Button from '../../src/components/Button';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <h3>Estamos carregando as perguntas.... </h3>
        <h3>Se prepare! :)</h3>
        <br />
        <br />
        <img width="300px" alt="gif loading" src="https://media.giphy.com/media/eemPC4yhITcTm/giphy.gif" />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlt, setSelectedAlt] = useState(undefined);
  const [isSubmited, setIsSubmited] = useState(false);
  const isCorrect = selectedAlt === question.answer;
  const hasAlternativeSelected = selectedAlt !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsSubmited(false);
            setSelectedAlt('');
          }, 3 * 1000);
        }}
        >
          {question.alternatives.map((alternativa, alternativaIndex) => {
            const alternativaId = `alternative__${alternativaIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlt === alternativaIndex;
            return (
              <Widget.Topic
                key={alternativaId}
                as="label"
                htmlFor={alternativaId}
                data-selected={isSelected}
                data-status={isSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativaId}
                  type="radio"
                  name={questionId}
                  onChange={() => {
                    setSelectedAlt(alternativaIndex);
                  }}
                />
                {alternativa}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isSubmited && isCorrect && <p>Parabéns voce acertou!!</p>}
          {isSubmited && !isCorrect && <p>Poxa vida!! Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
  LOADING: 'LOADING',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];
  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1500);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          question={question}
          onSubmit={handleSubmit}
          addResult={addResult}
        />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && (<ResultWidget results={results} />)}
      </QuizContainer>
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
};
