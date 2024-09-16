import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate();

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
            await axios.post("http://localhost:8083/estudiante", user);
            navigate("/homeestudiantes");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Agregar estudiante</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre del estudiante</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                placeholder="Ingrese el nombre del estudiante"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genero" className="form-label">Genero del estudiante</label>
                            <input
                                type="text"
                                id="genero"
                                className="form-control"
                                placeholder="Ingrese el genero del estudiante"
                                name="genero"
                                value={genero}
                                onChange={(e) => onInputChange(e)}
                            />
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
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
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
