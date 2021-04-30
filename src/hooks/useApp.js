import { useEffect, useState } from "react";
import useInputValidation from "./useInputValidation";

// Validaciones según cada campo.
const validarNombresApellidos = (nuevoValor) => {
  return nuevoValor.length <= 40;
};

const validarCorreo = (valorCorreo, validar = true) => {
  if (validar === false || valorCorreo === "") return true;
  return /^(?:[a-zA-Z0-9]+\.?)+[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
    valorCorreo
  );
};

const validarTelefono = (valorTelefono, validarAncho = true) => {
  if (valorTelefono === "") return true;
  if (/^\+?\d+$/.test(valorTelefono) === false || valorTelefono.length > 8)
    return false;
  if (!validarAncho) return true;
  return valorTelefono.length == 8;
};

export default ({
  nombres: n,
  apellidos: a,
  fechaNacimiento: fn,
  correo: c,
  telefono: t,
} = {}) => {
  const [nombres, setNombres, errorNombres] = useInputValidation(
    validarNombresApellidos,
    n
  );
  const [apellidos, setApellidos, errorApellidos] = useInputValidation(
    validarNombresApellidos,
    a
  );
  const [fechaNacimiento, setFechaNacimiento] = useState(fn);
  const [correo, setCorreo, errorCorreo] = useInputValidation(validarCorreo, c);
  const [telefono, setTelefono, errorTelefono] = useInputValidation(
    validarTelefono,
    t
  );

  // Flags internos
  const [datosValidos, setDatosValidos] = useState(false);
  const [validandoDatos, setValidandoDatos] = useState(false);

  // Estamos a la escucha de cambios sobre las propiedades de error, o el envio del formulario
  // Denotará si este se encuentra correctamente válidado
  useEffect(() => {
    if (validandoDatos) {
      const datosValidos =
        [errorNombres, errorApellidos, errorCorreo, errorTelefono].some(
          (x) => x === true
        ) === false;

      console.log(datosValidos);
      if (datosValidos) {
        setDatosValidos(true);
        setTimeout(() => {
          setDatosValidos(false);
        }, 1000);
      }
    }
    setValidandoDatos(false);
  }, [
    nombres,
    apellidos,
    fechaNacimiento,
    correo,
    telefono,
    validandoDatos,
    datosValidos,
  ]);

  // Ejecutamos todas las validaciones en los inputs
  const validar = () => {
    setNombres(nombres);
    setApellidos(apellidos);
    setFechaNacimiento(fechaNacimiento);
    setCorreo(correo);
    setTelefono(telefono);
    setValidandoDatos(true);
  };

  return {
    nombres: [nombres, setNombres, errorNombres],
    apellidos: [apellidos, setApellidos, errorApellidos],
    fechaNacimiento: [fechaNacimiento, setFechaNacimiento],
    correo: [correo, setCorreo, errorCorreo],
    telefono: [telefono, setTelefono, errorTelefono],
    datosValidos,
    validar,
  };
};
