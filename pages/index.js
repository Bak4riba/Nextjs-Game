import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          initial={{ x: -900 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 50 }}
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              // eslint-disable-next-line no-undef
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="Nome do usuario"
                placeholder="Qual seu nome, caro ninja?"
                onChange={(e) => { setName(e.target.value); }}
                value={name}
              />
              <Button
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                type="submit"
                disabled={name.length === 0}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          initial={{ x: -900 }}
          animate={{ x: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 50 }}
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => (
                <li key={linkExterno}>
                  <Widget.Topic href={linkExterno}>
                    {linkExterno.split('https://github.com/')}
                  </Widget.Topic>
                </li>
              ))}
            </ul>
          </Widget.Content>
        </Widget>

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Bak4riba" />
    </QuizBackground>
  );
}
