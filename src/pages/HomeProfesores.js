import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [teachers, setTeachers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {
        const result = await axios.get("http://localhost:8083/profesores-bd");
        setTeachers(result.data);
    };

    const deleteTeachers = async (id) => {
        await axios.delete(`http://localhost:8083/profesorEliminado/${id}`);
        loadTeachers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Genero</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Email</th>
                            <th scope="col">acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map((teacher, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>

                                    <td>{teacher.nombre}</td>
                                    <td>{teacher.genero}</td>
                                    <td>{teacher.edad}</td>
                                    <td>{teacher.departamento}</td>
                                    <td>{teacher.cargo}</td>
                                    <td>{teacher.email}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewprofesor/${teacher.id}`}
                                        >
                                            View
                                        </Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/editprofesor/${teacher.id}`}
                                        >Editar</Link>
                                        <button className='btn btn-danger mx-2' onClick={() => deleteTeachers(teacher.id)}>
                                            Eliminar</button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Link className='btn btn-primary' to='/'>Volver al inicio</Link>
        </div>
    )
}
