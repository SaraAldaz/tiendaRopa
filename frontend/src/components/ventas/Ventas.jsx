import axios from "axios";
import { useEffect, useState } from "react";

function Ventas() {

    const [ventas, setVentas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [vendedores, setVendedores] = useState([]);

    const [fechaVenta, setFechaVenta] = useState("");
    const [total, setTotal] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [idVendedor, setIdVendedor] = useState("");

    const [editando, setEditando] = useState(false);
    const [idVenta, setIdVenta] = useState(null);

    useEffect(() => {

        obtenerVentas();
        obtenerProductos();
        obtenerVendedores();

    }, []);

    const obtenerVentas = async () => {

        try {

            const respuesta =
                await axios.get(
                    "http://localhost:3000/ventas"
                );

            setVentas(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

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

    const obtenerVendedores = async () => {

        try {

            const respuesta =
                await axios.get(
                    "http://localhost:3000/vendedores"
                );

            setVendedores(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

    const agregarVenta = async () => {

        try {

            await axios.post(
                "http://localhost:3000/ventas",
                {
                    fechaVenta,
                    total,
                    idProducto: idProducto,
                    idVendedor: idVendedor
                }
            );

            obtenerVentas();

            limpiarFormulario();

        } catch (error) {

            console.log(error);

        }

    };

    const eliminarVenta = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/ventas/${id}`
            );

            obtenerVentas();

        } catch (error) {

            console.log(error);

        }

    };

    const seleccionarVenta = (venta) => {

        setFechaVenta(venta.fechaVenta);

        setTotal(venta.total);

        setIdProducto(venta.idProducto);

        setIdVendedor(venta.idVendedor);

        setIdVenta(venta.idVenta);

        setEditando(true);

    };

    const actualizarVenta = async () => {

        try {

            await axios.put(
                `http://localhost:3000/ventas/${idVenta}`,
                {
                    fechaVenta,
                    total,
                    idProducto: idProducto,
                    idVendedor: idVendedor
                }
            );

            obtenerVentas();
            limpiarFormulario();
            setEditando(false);

        } catch (error) {

            console.log(error);

        }

    };

    const limpiarFormulario = () => {

        setFechaVenta("");
        setTotal("");
        setIdProducto("");
        setIdVendedor("");

    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                Ventas
            </h1>

            <div className="card p-4 shadow-sm mb-4">

                <input
                    type="date"
                    className="form-control mb-2"
                    value={fechaVenta}
                    onChange={(e) =>
                        setFechaVenta(e.target.value)
                    }
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Total"
                    value={total}
                    onChange={(e) =>
                        setTotal(e.target.value)
                    }
                />

                <select
                    className="form-control mb-2"
                    value={idProducto}
                    onChange={(e) =>
                        setIdProducto(e.target.value)
                    }
                >

                    <option value="">
                        Seleccione producto
                    </option>

                    {
                        productos.map((producto) => (

                            <option
                                key={producto.idProducto}
                                value={producto.idProducto}
                            >

                                {producto.nombreProducto}

                            </option>

                        ))
                    }

                </select>

                <select
                    className="form-control mb-2"
                    value={idVendedor}
                    onChange={(e) =>
                        setIdVendedor(e.target.value)
                    }
                >

                    <option value="">
                        Seleccione vendedor
                    </option>

                    {
                        vendedores.map((vendedor) => (

                            <option
                                key={vendedor.idVendedor}
                                value={vendedor.idVendedor}
                            >

                                {vendedor.nombre}

                            </option>

                        ))
                    }

                </select>

                {
                    editando ? (

                        <button
                            className="btn btn-warning"
                            onClick={actualizarVenta}
                        >
                            Actualizar venta
                        </button>

                    ) : (

                        <button
                            className="btn btn-primary"
                            onClick={agregarVenta}
                        >
                            Agregar venta
                        </button>

                    )
                }

            </div>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Producto</th>
                        <th>Vendedor</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        ventas.map((venta) => (

                            <tr
                                key={venta.idVenta}
                            >

                                <td>
                                    {venta.idVenta}
                                </td>

                                <td>
                                    {venta.fechaVenta}
                                </td>

                                <td>
                                    ${venta.total}
                                </td>

                                <td>
                                    {venta.idProducto}
                                </td>

                                <td>
                                    {venta.idVendedor}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() =>
                                            seleccionarVenta(
                                                venta
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminarVenta(
                                                venta.idVenta
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

export default Ventas;