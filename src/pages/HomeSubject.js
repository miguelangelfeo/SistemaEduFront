import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [subjects, setSubjects] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        const result = await axios.get("https://sisteducacion.onrender.com/asignaturas-bd");
        setSubjects(result.data);
    };

    const deleteSubject = async (id) => {
        await axios.delete(`https://sisteducacion.onrender.com/asignaturaEliminada/${id}`);
        loadSubjects();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre de asignatura</th>
                            <th scope="col">Creditos</th>
                            <th scope="col">acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjects.map((subject, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>

                                    <td>{subject.nombre}</td>
                                    <td>{subject.creditos}</td>
                                    <td>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/editsubject/${subject.id}`}
                                        >Editar</Link>
                                        <button className='btn btn-danger mx-2' onClick={() => deleteSubject(subject.id)}>
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
