import "./css/App.css";
import React from "react";
import ReactDatePicker from "react-datepicker";
import ErrorDisplayer from "./components/ErrorDisplayer";
import useApp from "./hooks/useApp";

// Ejecuta la funcion definida para el manejo del input
function handleChange(setter, ...params) {
  // Extrae el valor del input y ejecuta el setter designado, añadiendo parametros adicionales si los hay
  return function ({ target: { value } }) {
    setter(value, ...params);
  };
}

// Ejecuta la funcion definida en callback
function handleSubmit(callback) {
  return (ev) => {
    ev.preventDefault();
    callback();
  };
}

// const initialData = {
//   nombres: "Nombre de prueba",
//   apellidos: "Apellido de prueba",
//   fechaNacimiento: new Date(),
//   correo: "Correo@gmail.com",
//   telefono: "78811161",
// };

const initialData = {};

function App() {
  const {
    nombres: [nombres, setNombres, errorNombres],
    apellidos: [apellidos, setApellidos, errorApellidos],
    fechaNacimiento: [fechaNacimiento, setFechaNacimiento],
    correo: [correo, setCorreo, errorCorreo],
    telefono: [telefono, setTelefono, errorTelefono],
    datosValidos,
    validar,
  } = useApp(initialData);

  return (
    <main className="vh-100 d-flex flex-column justify-content-center">
      <div className="container mh-100">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-sm-12 ">
            <div className="p-4 bg-info text-white">
              <h4 className="m-0">Ingreso de datos</h4>
            </div>
            <form onSubmit={handleSubmit(validar)} className="bg-white p-4">
              <div className="form-group">
                <label>Nombres</label>
                <input
                  className="form-control"
                  value={nombres}
                  name="nombres"
                  placeholder="Ingrese sus nombres"
                  onChange={handleChange(setNombres)}
                  onBlur={handleChange(setNombres)}
                  required
                />
                <ErrorDisplayer
                  error={errorNombres}
                  message="Por favor ingrese un nombre no mayor a 40 caracteres"
                />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input
                  className="form-control"
                  value={apellidos}
                  name="apellidos"
                  placeholder="Ingrese sus apellidos"
                  onChange={handleChange(setApellidos)}
                  onBlur={handleChange(setApellidos)}
                  required
                />
                <ErrorDisplayer
                  error={errorApellidos}
                  message="Por favor ingrese un apellido no mayor a 40 caracteres"
                />
              </div>
              <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <div className="mb-4">
                  <ReactDatePicker
                    className="form-control"
                    name="fechaNacimiento"
                    wrapperClassName="datePicker"
                    placeholderText="Formato mm/dd/yyyy"
                    selected={fechaNacimiento}
                    onChange={(date) => setFechaNacimiento(date)}
                    dateFormat="MM/dd/yyyy"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  placeholder="ejemplo@dominio.com"
                  value={correo}
                  name="email"
                  onChange={handleChange(setCorreo, false)}
                  onBlur={handleChange(setCorreo)}
                  required
                />
                <ErrorDisplayer
                  error={errorCorreo}
                  message="Por favor digite un correo válido"
                />
              </div>
              <div className="form-group">
                <label>Télefono</label>
                <input
                  className="form-control"
                  value={telefono}
                  name="telefono"
                  placeholder="Ingrese un télefono de 8 dígitos"
                  maxLength={8}
                  onChange={handleChange(setTelefono, false)}
                  onBlur={handleChange(setTelefono, true)}
                  required
                />
                <ErrorDisplayer
                  error={errorTelefono}
                  placeholder="12345678"
                  message="Por favor ingrese un télefono válido"
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-info">
                  Enviar datos
                </button>
                {datosValidos && (
                  <div className="alert alert-success mb-0 px-3 py-1">
                    Todos los campos están correctos :-)
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
