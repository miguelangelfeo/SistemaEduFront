import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [subjects, setSubjects] = useState([]);
    const [expandedSubjectId, setExpandedSubjectId] = useState(null);  // Estado para controlar la asignatura expandida

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        const result = await axios.get("http://localhost:8083/asignaturas");
        setSubjects(result.data);
    };

    const deleteSubject = async (id) => {
        await axios.delete(`https://sisteducacion.onrender.com/asignaturaEliminada/${id}`);
        loadSubjects();
    };

    const toggleStudents = (id) => {
        // Cambiar el estado para expandir o contraer los estudiantes de la asignatura
        setExpandedSubjectId(expandedSubjectId === id ? null : id);
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre de asignatura</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Creditos</th>
                            <th scope="col">Profesor</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjects.map((subject, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{subject.nombre}</td>
                                        <td>{subject.descripcion}</td>
                                        <td>{subject.creditos}</td>
                                        <td>{subject.profesor ? subject.profesor.nombre : 'No asignado'}</td>  {/* Mostrar el nombre del profesor */}
                                        <td>
                                            <button className='btn btn-danger mx-2' onClick={() => deleteSubject(subject.id)}>
                                                Eliminar
                                            </button>
                                            <button className='btn btn-info mx-2' onClick={() => toggleStudents(subject.id)}>
                                                {expandedSubjectId === subject.id ? 'Ocultar Estudiantes' : 'Ver Estudiantes'}
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedSubjectId === subject.id && (
                                        <tr>
                                            <td colSpan="5">
                                                <ul>
                                                    {subject.estudiantes && subject.estudiantes.map((student, studentIndex) => (
                                                        <li key={studentIndex}>
                                                            {student.nombre}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Link className='btn btn-primary' to='/'>Volver al inicio</Link>
        </div>
    );
}
