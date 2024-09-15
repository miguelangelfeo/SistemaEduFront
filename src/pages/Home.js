import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8083/estudiantes-bd");
        setUsers(result.data);
    };

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
                                        <button className='btn btn-primary mx-2'>Ver</button>
                                        <button className='btn btn-outline-primary mx-2'>Editar</button>
                                        <button className='btn btn-danger mx-2'>Eliminar</button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
