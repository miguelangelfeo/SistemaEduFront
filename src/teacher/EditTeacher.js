import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditTeacher() {

    let navigate = useNavigate();
    const { id } = useParams();

    const [teacher, setTeacher] = useState({
        nombre: "",
        genero: "",
        edad: "",
        departamento: "",
        cargo: "",
        email: ""
    });

    const { nombre, genero, edad, departamento, cargo, email } = teacher;

    const onInputChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(teacher); // Para verificar el contenido de 'teacher'
            await axios.put(`https://sisteducacion-4ese.onrender.com/profesor/${id}`, teacher);
            navigate("/homeprofesores");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    useEffect(() => {
        loadTeacher();
    }, []);

    const loadTeacher = async () => {
        try {
            const result = await axios.get(`https://sisteducacion-4ese.onrender.com/profesores/${id}`);
            setTeacher(result.data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Editar profesor</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre del profesor</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                placeholder="Ingrese el nombre del profesor"
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
                            <label htmlFor="edad" className="form-label">Edad del profesor</label>
                            <input
                                type="number"
                                id="edad"
                                className="form-control"
                                placeholder="Ingrese la edad del profesor"
                                name="edad"
                                value={edad}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="departamento" className="form-label">Departamento</label>
                            <input
                                type="text"
                                id="departamento"
                                className="form-control"
                                placeholder="Ingrese el departamento"
                                name="departamento"
                                value={departamento}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cargo" className="form-label">Cargo</label>
                            <select
                                id="cargo"
                                className="form-control"
                                name="cargo"
                                value={cargo}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Seleccione el cargo</option>
                                <option value="Cátedra">Cátedra</option>
                                <option value="Planta">Planta</option>
                            </select>
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
                        <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/homeprofesores")}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
