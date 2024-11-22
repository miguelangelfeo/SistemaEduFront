import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addsubject() {
    let navigate = useNavigate();

    const [subject, setSubject] = useState({
        nombre: "",
        creditos: "",
        descripcion: "",
        profesor: "",
        estudiantes: [],
    });

    const [professors, setProfessors] = useState([]);
    const [students, setStudents] = useState([]);

    const { nombre, creditos, descripcion, profesor, estudiantes } = subject;

    // Cargar datos desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [professorRes, studentRes] = await Promise.all([
                    axios.get("https://sisteducacion-4ese.onrender.com/profesores-bd"),
                    axios.get("https://sisteducacion-4ese.onrender.com/estudiantes-bd"),
                ]);
                setProfessors(professorRes.data);
                setStudents(studentRes.data);
            } catch (error) {
                console.error("Error al obtener profesores y estudiantes:", error);
            }
        };
        fetchData();
    }, []);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSubject({
            ...subject,
            [name]: name === "creditos" ? Number(value) : value, // Convertir "creditos" a número
        });
    };

    const handleProfessorChange = (e) => {
        setSubject({ ...subject, profesor: e.target.value });
    };

    const handleStudentChange = (e) => {
        const studentId = e.target.value;
        setSubject((prevSubject) => {
            const isChecked = e.target.checked;
            const updatedEstudiantes = isChecked
                ? [...prevSubject.estudiantes, studentId]
                : prevSubject.estudiantes.filter((id) => id !== studentId);

            return { ...prevSubject, estudiantes: updatedEstudiantes };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Crear una copia del objeto 'subject' y convertir 'creditos' en número
            const payload = {
                ...subject,
                profesorId: subject.profesor,
                creditos: Number(subject.creditos), // Convertir 'creditos' a número
            };

            console.log("Datos enviados al backend:", payload); // Verificar datos finales
            await axios.post("https://sisteducacion-4ese.onrender.com/asignatura", payload);
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
                            <label htmlFor="descripcion" className="form-label">Descripción de la asignatura</label>
                            <input
                                type="text"
                                id="descripcion"
                                className="form-control"
                                placeholder="Ingrese una descripción de la asignatura"
                                name="descripcion"
                                value={descripcion}
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="profesor" className="form-label">Profesor</label>
                            <select
                                id="profesor"
                                className="form-control"
                                name="profesor"
                                value={profesor}
                                onChange={handleProfessorChange}
                            >
                                <option value="">Seleccione un profesor</option>
                                {professors.map((professor) => (
                                    <option key={professor.id} value={professor.id}>
                                        {professor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Estudiantes</label>
                            <div className="form-check">
                                {students.map((student) => (
                                    <div key={student.id}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`student-${student.id}`}
                                            value={String(student.id)}
                                            checked={estudiantes.includes(String(student.id))}
                                            onChange={handleStudentChange}
                                        />
                                        <label className="form-check-label" htmlFor={`student-${student.id}`}>
                                            {student.nombre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/homesubject")}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
