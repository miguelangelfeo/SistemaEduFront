import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function ViewUser() {

    const [user, setUser] = useState({
        nombre: "",
        genero: "",
        edad: "",
        carrera: "",
        email: "",
        semestre: "",
        promedio: ""
    });

    const { id } = useParams();

    const loadUser = async () => {
        try {
            const result = await axios.get(`https://sisteducacion-4ese.onrender.com/estudiantes/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Informacion del estudiante</h2>

                    <div className="card">
                        <div className="card-header">
                            detalles del usuario :
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item"> <b>Nombre: </b> {user.nombre} </li>
                                <li className="list-group-item"> <b>Género: </b> {user.genero} </li>
                                <li className="list-group-item"> <b>Edad: </b> {user.edad} </li>
                                <li className="list-group-item"> <b>Carrera: </b> {user.carrera} </li>
                                <li className="list-group-item"> <b>Email: </b> {user.email} </li>
                                <li className="list-group-item"> <b>Semestre: </b> {user.semestre} </li>
                                <li className="list-group-item"> <b>Promedio: </b> {user.promedio} </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/homeestudiantes"}>Volver al inicio</Link>
                </div>
            </div>
        </div>
    )
}
