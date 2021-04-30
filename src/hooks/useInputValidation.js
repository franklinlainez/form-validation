import { useState } from "react";

export default (validacion = null, valorInicial = "") => {
  const [valor, setValor] = useState({
    valor: valorInicial,
    error: "",
  });

  const { valor: valorActual, error } = valor;

  // Ejecuta la funcion definida para evaluar si el nuevo valor proporcionado es correcto.
  function setValorValidado(...parametros) {
    if (validacion && !validacion(...parametros)) {
      const { valor: valorAnterior } = valor;
      setValor({ valor: valorAnterior, error: true });
    } else {
      setValor({ valor: parametros[0], error: false });
    }
  }

  return [valorActual, setValorValidado, error];
};
