import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePrincipal() {
    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='text-center'>
                    <h1>Bienvenido al Sistema Educativo</h1>
                    <p>Selecciona una opción para continuar:</p>
                    <div className='mt-4'>
                        <Link to="/homeestudiantes" className="btn btn-info mx-2">
                            Ir a Estudiantes
                        </Link>
                        <Link to="/homeprofesores" className="btn btn-success mx-2">
                            Ir a Profesores
                        </Link>
                        <Link to="/homesubject" className="btn btn-success mx-2">
                            Ir a asignaturas
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
