import { useEffect, useState } from 'react';
import { useParams, useNavegate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './filme-info.css';

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] =  useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "2352ba171d1558658f6f3c949589a217",
                    language: "pt-BR"
                }
            })
            .then((respone)=>{
                setFilme(respone.data);
                setLoading(false);

            })
            .catch(()=>{
                navigate("*", { replace: true });
                return;
            })  
        }
        
        loadFilme();

        return () => {}
    }, [navigate, id])

    function salvarFilme(){
        const Lista = localStorage.getItem("@weedflix");
        let filmeSalvo = JSON.parse(Lista) || [];
        const hasFilme = filmeSalvo.some( (filmeSalvo) => filmeSalvo.id === filme.id);

        if(hasFilme){
            toast.warn('Filme ja adicionado!')
            return;
        }

        filmeSalvo.push(filme);
        localStorage.setItem("@weedflix" , JSON.stringify(filmeSalvo));
        toast.success('Filme adicionado a lista de favoritos!');

    }

    if(loading){
        return(
            <div className='loading'>
                Carregando descrição...
            </div>
        )
    }
    return(
        <div className='filme-info'>
                <h1>{filme.title}</h1>
            <div className='altdor'>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                <div className='sinopse' >
                    <h2>Sinopse</h2>
                    <span>{filme.overview}</span>
                    <strong className='nota'>Avaliação: {filme.vote_average.toFixed(1)} /10</strong>
                </div>
            </div>
            <div className='button'>
                <button onClick={salvarFilme}>Salvar</button>                
                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
            </div>
        </div>
    )
}

export default Filme;