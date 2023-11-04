import React, { useState, useEffect } from "react";
import "./style.css";
function StandingsMos(props) {
    console.log("xxx", props.stadi);
    const [showT, setShow] = useState(true);
    const Show = () => {//ocultar grupos completos
        setShow(!showT);

    }
    let [groupid, setGroup] = useState();

    return (
        <>
        <p>TABLA DE GRUPOS FIFA WORLD CUP 2022</p>
            {showT
                ? <button className="boton1" onClick={() => Show()}>Filtrar por grupo</button>
                : <button className="boton2" onClick={() => Show()}>Volver</button>
            }
            {showT ?

                <div className="contenedor">
                    {props.stadi.map((esta, index) => (
                        <>
                            <div className="groups-l1">
                                <>
                                    <h3>GRUPO {esta.group}</h3>
                                    {esta.teams.map((teams) => (
                                        <div className="groups-l2">
                                            <div className="groups-details">
                                                <h2>{teams.name_en}</h2>
                                                <img src={teams.flag} alt="" />
                                            </div>                       
                                            <table className="table-standings">                                               
                                                <tr>
                                                    <th>Goles a favor</th>
                                                    <th>Goles en contra</th>
                                                    <th>Partidos jugados</th>
                                                    <th>Partidos ganados</th>
                                                    <th>Partidos perdidos</th>
                                                    <th>Partidos empates</th>
                                                    <th>Puntos obtenidos</th>
                                                </tr>
                                                <tr>
                                                    <th>{teams.gf}</th>
                                                    <th>{teams.ga}</th>
                                                    <th>{teams.mp}</th>
                                                    <th>{teams.w}</th>
                                                    <th>{teams.l}</th>
                                                    <th>{teams.d}</th>
                                                    <th>{teams.pts}</th>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                    ))}
                                </>
                                
                            </div>
                            
                        </>
                    ))}
                </div> : null}
            {!showT ?  //filtro por grupo             
                <div className="filter-l1">
                    <input type="text" onChange={ev => setGroup(ev.target.value)} placeholder="Filtre un grupo. ej:A" />
                    <div className="filter-l2">
                        {props.stadi.map((esta, index) => (
                            groupid === esta.group ?
                                <div className="filter-l3">
                                    <h3>GRUPO {esta.group}</h3>
                                    {esta.teams.map((teams) => (
                                        <div className="groups-l2">
                                            <div className="groups-details">
                                                <h2>{teams.name_en}</h2>
                                                <img src={teams.flag} alt="" />
                                            </div>                       
                                            <table className="table-standings">                                               
                                                <tr>
                                                    <th>Goles a favor</th>
                                                    <th>Goles en contra</th>
                                                    <th>Partidos jugados</th>
                                                    <th>Partidos ganados</th>
                                                    <th>Partidos perdidos</th>
                                                    <th>Partidos empates</th>
                                                    <th>Puntos obtenidos</th>
                                                </tr>
                                                <tr>
                                                    <th>{teams.gf}</th>
                                                    <th>{teams.ga}</th>
                                                    <th>{teams.mp}</th>
                                                    <th>{teams.w}</th>
                                                    <th>{teams.l}</th>
                                                    <th>{teams.d}</th>
                                                    <th>{teams.pts}</th>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                    ))}
                                </div> : null
                        ))}
                    </div>
                </div> : null}
        </>
    )
}
export default StandingsMos;
