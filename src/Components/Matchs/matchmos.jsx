import React, { useState, useEffect } from "react";
import "./style.css";

function Mostmacht(props) {
    console.log('Matchts', props.mat);
    let [cod, setTeam] = useState();
    const MosDate = (x) => {///muestra todos los datos de la api matchts
        setTeam(x);
        setShow(false);
        setShowDate(true);
    }
    const volverMachts = () => {//volver a ver todo
        setShow(true);
        setShowDate(false);
        setTeam(null);
        setdia(null);
        setfecha(null);
    }
    const MosDatefd = (x) => {//filtro del dia, ver datos
        setShowDia(false);
        setShowDate(true);
        setTeam(x);
    }
    const MostrarDias = () => {//ver filtro dia
        setShow(false);
        setShowDia(true);
        setShowFecha(false);
        setfecha(null);
    }
    const verTodo = () => {//ver todo los mat
        setShow(true);
        setShowDia(false);
        setShowFecha(false);
        setdia(null);
        setfecha(null);
    }
    const MostrarFiltrodia = () => {//ver filtro dia
        setShow(false);
        setShowDia(false);
        setdia(false);
        setShowFecha(true);
        ;
    }
    const MosDateffecha = (x) => {//ver datos del filtro por fecha
        setShowFecha(false);
        setShowDate(true);
        setTeam(x);
    }

    let text = "";
    //const myArray = {};


    const [showT, setShow] = useState(true);
    const [showdate, setShowDate] = useState(false);
    const [showdia, setShowDia] = useState(false);
    const [showfecha, setShowFecha] = useState(false);
    const [dia, setdia] = useState();
    const [fecha, setfecha] = useState();



    //console.log(myArray[0]);
    return (
        <>
            <div className="menu">
                {showT?<p>Filtros:</p>:null}
                {showT?<button className="botones" onClick={MostrarDias}>Dia</button>:null}
                {showT?<button className="botones" onClick={MostrarFiltrodia}>Fecha</button>:null}
                {!showdate ? <button className="botones" onClick={verTodo}>Todos</button> : null}
            </div>
            {showT ?
                <div className="all-matches">
                    {props.mat.map((match, index) => (
                        <div className="all-matches-details">
                            <p><img src={match.away_flag} alt="" />   vs   <img src={match.home_flag} alt="" /></p>
                            <div className="info">
                                <p>{match.away_team_en}    vs     {match.home_team_en}</p>
                                <p>{match.away_score}  /   {match.home_score}</p>
                                <button className="botones" onClick={() => MosDate(match.id)}>Datos</button>
                            </div>
                        </div>
                    ))}
                </div> : null}
            {showdate ?
                <div className="match-details">{ /*Ver api completa*/}
                    {props.mat.map((match, Index) => (
                        match.id == cod ?
                            <>
                                <table className="table-details">
                                    <tr>
                                        <td>Info</td>
                                        <td><img src={match.away_flag} /></td>
                                        <td><img src={match.home_flag} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td>Equipos</td>
                                        <td>{match.away_team_en}</td>
                                        <td>{match.home_team_en}</td>
                                    </tr>
                                    <tr>
                                        <td>Goles</td>
                                        <td>{match.away_score}</td>
                                        <td>{match.home_score}</td>
                                    </tr>
                                    <tr>
                                        <td>Anotadores</td>
                                        <td>{match.away_scorers}</td>
                                        <td>{match.home_scorers}</td>
                                    </tr>
                                    <tr>
                                        <td>Grupo</td>
                                        <td colSpan={4}>{match.group}</td>
                                    </tr>
                                    <tr>
                                        <td>Hora Local</td>
                                        <td colSpan={4}>{match.local_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Tiempo jugado</td>
                                        <td colSpan={4}>{match.time_elapsed}</td>
                                    </tr>
                                </table>
                                <button className="botones" onClick={volverMachts}>Volver</button>
                            </> : null
                    ))}
                </div>
                : null}
            {showdia ?//filtro por dia
                <div>
                <input type="text" onChange={ev => setdia(ev.target.value)} placeholder="Digite el dia" /> 
                <div className="all-matches">
                    {props.mat.map((match, index) => (
                        dia === match.matchday ?
                            <div className="all-matches-details">     
                            <div className="info">                          
                                <img src={match.away_flag} alt="" /> vs <img src={match.home_flag} alt="" />
                                <p>{match.away_team_en}</p>  vs <p>{match.home_team_en}</p>
                                <button className="botones" onClick={() => MosDatefd(match.id)}>Datos</button>
                            </div>
                            </div> : null
                    ))}

                </div>
                </div>
                : null}

            {showfecha ?//filtro por fecha
                 <div>
                 <input type="text" onChange={ev => setfecha(ev.target.value)} placeholder="Digite la fecha mm/dd/yy" /> 
                 <div className="all-matches">
                     {props.mat.map((match, index) => (
                         fecha === match.local_date.slice(0, -6)? 
                             <div className="all-matches-details">     
                             <div className="info">                          
                                 <img src={match.away_flag} alt="" /> vs <img src={match.home_flag} alt="" />
                                 <p>{match.away_team_en}</p>  vs <p>{match.home_team_en}</p>
                                 <button className="botones" onClick={() => MosDatefd(match.id)}>Datos</button>
                             </div>
                             </div> : null
                     ))}
                 </div>
                </div>: null}
        </>
    )
}
export default Mostmacht;