import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("https://sisteducacion-4ese.onrender.com/estudiantes-bd");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`https://sisteducacion-4ese.onrender.com/estudianteEliminado/${id}`);
        loadUsers();
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
                            <th scope="col">edad</th>
                            <th scope="col">carrera</th>
                            <th scope="col">email</th>
                            <th scope="col">semestre</th>
                            <th scope="col">promedio</th>
                            <th scope="col">acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>

                                    <td>{user.nombre}</td>
                                    <td>{user.genero}</td>
                                    <td>{user.edad}</td>
                                    <td>{user.carrera}</td>
                                    <td>{user.email}</td>
                                    <td>{user.semestre}</td>
                                    <td>{user.promedio}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewuser/${user.id}`}
                                        >
                                            View
                                        </Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/edituser/${user.id}`}
                                        >Editar</Link>
                                        <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>
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
