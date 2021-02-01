import React from 'react';

export default function QuizDaGaleraPage() {
  return (
    <div>
      Desafio da próxima aula junto com as animações
    </div>
  );
}
/* export async function getServerSideProps(context) {

  return {
    props: '',
  };
} */
export async function getServerSideProps(context) {
  const dbExterno = await fetch('https://quiz-nextjs.bak4riba.vercel.app/api/db').then((responseServer) => {
    if (responseServer.ok) {
      return responseServer.json();
    }
    throw new Error('Falha em pegar os dados');
  }).then((convert) => convert)
    .catch((err) => {
      console.log(err);
    });
    console.log(dbExterno)
  return {
    props: {}, // will be passed to the page component as props
  };
}
