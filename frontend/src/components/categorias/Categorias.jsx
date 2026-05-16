import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Categorias() {

  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [editando, setEditando] = useState(false);
  const [idCategoria, setIdCategoria] = useState(null);

  useEffect(() => {

    obtenerCategorias();

  }, []);

  const obtenerCategorias = async () => {

    try {

      const respuesta = await axios.get(
        "http://localhost:3000/categorias"
      );

      setCategorias(respuesta.data);

    } catch (error) {

      console.log(error);

    }

  };

  const agregarCategoria = async () => {

    try {

      await axios.post(
        "http://localhost:3000/categorias",
        {
          nombreCategoria: nombreCategoria
        }
      );

      obtenerCategorias();

      setNombreCategoria("");

    } catch (error) {

      console.log(error);

    }

  };

  const eliminarCategoria = async (id) => {

    try {

      await axios.delete(
        `http://localhost:3000/categorias/${id}`
      );

      obtenerCategorias();

    } catch (error) {

      console.log(error);

    }

  };

  const seleccionarCategoria = (categoria) => {

    setNombreCategoria(
      categoria.nombreCategoria
    );

    setIdCategoria(
      categoria.idCategoria
    );

    setEditando(true);

  };
  const actualizarCategoria = async () => {

    try {

      await axios.put(
        `http://localhost:3000/categorias/${idCategoria}`,
        {
          nombreCategoria: nombreCategoria
        }
      );

      obtenerCategorias();

      setNombreCategoria("");

      setEditando(false);

      setIdCategoria(null);

    } catch (error) {

      console.log(error);

    }

  };
  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        Categorías
      </h1>

      <div className="mb-3">

        <input
          type="text"
          className="form-control"
          placeholder="Nombre categoría"
          value={nombreCategoria}
          onChange={(e) =>
            setNombreCategoria(e.target.value)
          }
        />

        {
          editando ? (

            <button
              className="btn btn-warning mt-2"
              onClick={actualizarCategoria}
            >
              Actualizar
            </button>

          ) : (

            <button
              className="btn btn-primary mt-2"
              onClick={agregarCategoria}
            >
              Agregar
            </button>

          )
        }

      </div>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>ID</th>

            <th>Nombre</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {
            categorias.map((categoria) => (

              <tr
                key={categoria.idCategoria}
              >

                <td>
                  {categoria.idCategoria}
                </td>

                <td>
                  {categoria.nombreCategoria}
                </td>

                <td>

                  <button
                    className="btn btn-warning me-2"
                    onClick={() =>
                      seleccionarCategoria(categoria)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      eliminarCategoria(
                        categoria.idCategoria
                      )
                    }
                  >
                    Eliminar
                  </button>
                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  )

}
export default Categorias;