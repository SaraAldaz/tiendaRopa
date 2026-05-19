import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nombreProducto, setNombreProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [foto, setFoto] = useState("");
    const [idCategoria, setIdCategoria] = useState("");

    useEffect(() => {

        obtenerProductos();
        obtenerCategorias();

    }, []);

    const obtenerProductos = async () => {

        try {

            const respuesta =
                await axios.get(
                    "http://localhost:3000/productos"
                );

            setProductos(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

    const obtenerCategorias = async () => {

        try {

            const respuesta =
                await axios.get(
                    "http://localhost:3000/categorias"
                );

            setCategorias(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

    const agregarProducto = async () => {

        try {

            await axios.post(
                "http://localhost:3000/productos",
                {
                    nombreProducto,
                    precio,
                    stock,
                    foto,
                    idCategoria: idCategoria
                }
            );

            obtenerProductos();

            setNombreProducto("");
            setPrecio("");
            setStock("");
            setFoto("");
            setIdCategoria("");

        } catch (error) {

            console.log(error);

        }

    };

    const eliminarProducto = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/productos/${id}`
            );

            obtenerProductos();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                Productos
            </h1>

            <div className="card p-4 mb-4 shadow-sm">

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={nombreProducto}
                    onChange={(e) =>
                        setNombreProducto(e.target.value)
                    }
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) =>
                        setPrecio(e.target.value)
                    }
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="URL imagen"
                    value={foto}
                    onChange={(e) =>
                        setFoto(e.target.value)
                    }
                />

                <select
                    className="form-control mb-2"
                    value={idCategoria}
                    onChange={(e) =>
                        setIdCategoria(e.target.value)
                    }
                >

                    <option value="">
                        Seleccione categoría
                    </option>

                    {
                        categorias.map((categoria) => (

                            <option
                                key={categoria.idCategoria}
                                value={categoria.idCategoria}
                            >

                                {categoria.nombreCategoria}

                            </option>

                        ))
                    }

                </select>

                <button
                    className="btn btn-primary"
                    onClick={agregarProducto}
                >
                    Agregar producto
                </button>

            </div>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        productos.map((producto) => (

                            <tr
                                key={producto.idProducto}
                            >

                                <td>
                                    {producto.idProducto}
                                </td>

                                <td>

                                    <img
                                        src={producto.foto}
                                        width="80"
                                    />

                                </td>

                                <td>
                                    {producto.nombreProducto}
                                </td>

                                <td>
                                    ${producto.precio}
                                </td>

                                <td>
                                    {producto.stock}
                                </td>

                                <td>
                                    {producto.idCategoria}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminarProducto(
                                                producto.idProducto
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

export default Productos;