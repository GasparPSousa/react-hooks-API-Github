/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function App() {
  
   const [repositories, setRepositories] = useState([])

   // Carregando uma informação assim que o componente for montado em tela(componentDidMount)
   useEffect(async () => {

      // puxando os dados da api do github
      const response = await fetch('https://api.github.com/users/gasparpsousa/repos');
      const data = await response.json();

      // carregando os repositórios com dados da minha api github
      setRepositories(data);

   }, []) // A função setRepositories será executada apenas uma vez nesse cenário, já que o segundo argumento é um array vazio, ou seja, não está passando nenhuma dependência para esse effect, não está passando nenhuma comparação. 

  return (
    <>
      <ul>
        { repositories.map(repo => (<li key={repo.id}> {repo.name} </li>))}
      </ul>
    </>
  );
}

export default App;
