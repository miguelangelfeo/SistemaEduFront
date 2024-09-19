import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSubject() {
    let navigate = useNavigate();
    const { id } = useParams();

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
            await axios.put(`https://sisteducacion.onrender.com/asignatura/${id}`, subject);
            navigate("/homesubject");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    useEffect(() => {
        loadSubject();
    }, []);

    const loadSubject = async () => {
        try {
            const result = await axios.get(`https://sisteducacion.onrender.com/asignaturas/${id}`);
            setSubject(result.data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Editar asignatura</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombreAsignatura" className="form-label">Nombre de la asignatura</label>
                            <input
                                type="text"
                                id="nombreAsignatura"
                                className="form-control"
                                placeholder="Ingrese el nombre de la asignatura"
                                name="nombreAsignatura"
                                value={nombre}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="creditos" className="form-label">Créditos de la asignatura</label>
                            <input
                                type="number"
                                id="creditos"
                                className="form-control"
                                placeholder="Ingrese los créditos de la asignatura"
                                name="creditos"
                                value={creditos}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/homesubject")}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
