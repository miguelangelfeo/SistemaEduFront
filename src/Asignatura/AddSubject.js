import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Addsubject() {

    let navigate = useNavigate();

    const [subject, setSubject] = useState({
        nombre: "",
        creditos: "",
    });

    const { nombre, creditos } = subject;

    const onInputChange = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(subject); // Para verificar el contenido de 'subject'
            await axios.post("http://localhost:8083/asignatura", subject);
            navigate("/homesubject");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Agregar asignatura</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre de la asignatura</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                placeholder="Ingrese el nombre de la asignatura"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genero" className="form-label">Creditos de la asignatura</label>
                            <input
                                type="number"
                                id="creditos"
                                className="form-control"
                                placeholder="Ingrese los creditos de la asignatura"
                                name="creditos"
                                value={creditos}
                                onChange={(e) => onInputChange(e)}
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
