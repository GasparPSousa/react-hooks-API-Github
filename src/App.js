/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function App() {
  
   const [repositories, setRepositories] = useState([])
  //  const [favorities, setFavorities] = useState([])

   // Carregando uma informação assim que o componente for montado em tela(componentDidMount)
   useEffect(async () => {

      // puxando os dados da api do github
      const response = await fetch('https://api.github.com/users/gasparpsousa/repos');
      const data = await response.json();

      // carregando os repositórios com dados da minha api github
      setRepositories(data);

   }, []); // A função setRepositories será executada apenas uma vez nesse cenário, já que o segundo argumento é um array vazio, ou seja, não está passando nenhuma dependência para esse effect, não está passando nenhuma comparação. 

   useEffect(() => {
     const filtered = repositories.filter(repo => repo.favorite)

     document.title = `Você tem ${filtered.length} favoritos`;
   }, [repositories]); // Toda vez que o segundo argumento alterar, temos uma atualização da função. (componentDidUpate)

   const handleFavorite = id => {
     const newRepositories = repositories.map(repo => {
       return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
     })

     setRepositories(newRepositories)
   }
  return (
    <>
      <ul>
        { repositories.map(repo => (
          <li key={repo.id}> 
            {repo.name}
            {repo.favorite && <span> ( Favorito )</span>}
            <button onClick={() => handleFavorite(repo.id)}> Favoritar</button>
        
         </li>))}
      </ul>
    </>
  );
}

export default App;
