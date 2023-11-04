import React, { useState, useEffect } from "react";
import '../Home/style.css';
function LlenarEquipos(props) {

    //props test
    console.log(props.team);
    const [show, setShow] = useState(false);


    let [cod, setTeam] = useState();
    const xxx = (x) => {
        setTeam(x);
    }

    return (     
        <>
         {!show?<h2>Paises clasificados a la copa del mundo Qatar 2022</h2>:null}
            <div id='grid'>
                {props.team.map((equipos, Index) => (
                    <>
                        {!show ? <div className="all-teams">
                            <h2>{equipos.name_en}</h2> 
                            <a onClick={() => { xxx(equipos.id); setShow(!show);}}><img src={equipos.flag} alt="150" width="150" /></a>                          
                            <p>Fifa Code: {equipos.fifa_code}</p>
                            <p id="plast">Grupo:  {equipos.groups}</p>         
                        </div> : null}
                    </>
                ))};
            </div>

            <div>
                {props.team.map((equipos, Index) => (
                    equipos.id == cod ?
                        <>{show ?
                            <div className="team-details">
                                <img src={equipos.flag} alt="150" width="150" />
                                <h2>{equipos.name_en}</h2>
                                <p>{equipos.name_fa}</p>
                                <p>Code: {equipos.fifa_code}</p>            
                                <p>iso2: {equipos.iso2}</p>
                                <p>Group: {equipos.groups}</p>
                                <button id="go-back" onClick={() => setShow(!show)}>Volver a todos los equipos</button>
                            </div> : null}
                        </> : null
                ))};
            </div>
        </>
    )
}

export default LlenarEquipos;