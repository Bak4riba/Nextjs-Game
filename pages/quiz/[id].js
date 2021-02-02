import React from 'react';

export default function QuizDaGaleraPage(props) {
  return (
    <div>
      Desafio da próxima aula junto com as animações
      <pre style={{ color: 'black' }}>
        {JSON.stringify(props, null, 4)}
      </pre>
    </div>
  );
}

export async function getServerSideProps() {
  const dbExterno = await fetch('https://quiz-nextjs.bak4riba.vercel.app/api/db').then((responseServer) => {
    if (responseServer.ok) {
      return responseServer.json();
    }
    throw new Error('Falha em pegar os dados');
  }).then((convert) => convert)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
