import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        nombre: "",
        genero: "",
        edad: "",
        carrera: "",
        email: "",
        semestre: "",
        promedio: ""
    });

    const { nombre, genero, edad, carrera, email, semestre, promedio } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user); // Para verificar el contenido de 'user'
            await axios.put(`http://localhost:8083/estudiante/${id}`, user);
            navigate("/homeestudiantes");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8083/estudiantes/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Editar estudiante</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre del estudiante</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                placeholder="Ingrese el nombre del estudiante"
                                name="nombre"
                                value={nombre}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genero" className="form-label">Género del profesor</label>
                            <select
                                id="genero"
                                className="form-control"
                                name="genero"
                                value={genero}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Seleccione el género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edad" className="form-label">Edad del estudiante</label>
                            <input
                                type="number"
                                id="edad"
                                className="form-control"
                                placeholder="Ingrese la edad del estudiante"
                                name="edad"
                                value={edad}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="carrera" className="form-label">Carrera</label>
                            <input
                                type="text"
                                id="carrera"
                                className="form-control"
                                placeholder="Ingrese la carrera"
                                name="carrera"
                                value={carrera}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Ingrese el email"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="semestre" className="form-label">Semestre</label>
                            <input
                                type="number"
                                id="semestre"
                                className="form-control"
                                placeholder="Ingrese el semestre"
                                name="semestre"
                                value={semestre}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="promedio" className="form-label">Promedio</label>
                            <input
                                type="number"
                                step="0.01"
                                id="promedio"
                                className="form-control"
                                placeholder="Ingrese el promedio"
                                name="promedio"
                                value={promedio}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/homeestudiantes")}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
