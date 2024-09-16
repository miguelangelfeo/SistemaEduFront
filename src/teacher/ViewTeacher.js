import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function ViewTeacher() {

    const [teacher, setTeacher] = useState({
        nombre: "",
        genero: "",
        edad: "",
        departamento: "",
        cargo: "",
        email: ""
    });

    const { id } = useParams();

    const loadTeacher = async () => {
        try {
            const result = await axios.get(`http://localhost:8083/profesores/${id}`);
            setTeacher(result.data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    useEffect(() => {
        loadTeacher();
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Informacion del profesor</h2>

                    <div className="card">
                        <div className="card-header">
                            detalles del profesor :
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item"> <b>Nombre: </b> {teacher.nombre} </li>
                                <li className="list-group-item"> <b>Género: </b> {teacher.genero} </li>
                                <li className="list-group-item"> <b>Edad: </b> {teacher.edad} </li>
                                <li className="list-group-item"> <b>Departamento: </b> {teacher.departamento} </li>
                                <li className="list-group-item"> <b>Cargo: </b> {teacher.cargo} </li>
                                <li className="list-group-item"> <b>email: </b> {teacher.email} </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/homeprofesores"}>Volver al inicio</Link>
                </div>
            </div>
        </div>
    )
}
