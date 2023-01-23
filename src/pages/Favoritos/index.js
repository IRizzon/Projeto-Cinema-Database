import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        const meusFilmes = localStorage.getItem("@weedflix");
        setFilmes(JSON.parse(meusFilmes) || [])

    }, [])

    function excluirFilme(id){
        let lastFilmes = filmes.filter((filme)=>{
            return(filme.id !== id)
        })
        setFilmes(lastFilmes);
        localStorage.setItem("@weedflix", JSON.stringify(lastFilmes))
        toast.success('Filme removido dos favoritos')
    }

    if(filmes.length === 0){
        return(
            <strong className='none'>
                Nenhum filme adicionado!
            </strong>
        )
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            
            <ul>
                {filmes.map((filme) => {
                    return(
                        <li key={filme.id}>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.image} />
                            <span>{filme.title}</span>
                            <p>Avaliação: {filme.vote_average.toFixed(1)} /10</p>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Descrição</Link>
                                <button onClick={()=> excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;