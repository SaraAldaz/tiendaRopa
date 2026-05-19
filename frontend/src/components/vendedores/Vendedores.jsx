import axios from "axios";
import { useEffect, useState } from "react";

function Vendedores() {

    const [vendedores, setVendedores] = useState([]);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    const [editando, setEditando] = useState(false);
    const [idVendedor, setIdVendedor] = useState(null);

    useEffect(() => {

        obtenerVendedores();

    }, []);

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

    const agregarVendedor = async () => {

        try {

            await axios.post(
                "http://localhost:3000/vendedores",
                {
                    nombre,
                    apellido,
                    telefono,
                    correo
                }
            );

            obtenerVendedores();

            limpiarFormulario();

        } catch (error) {

            console.log(error);

        }

    };

    const eliminarVendedor = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/vendedores/${id}`
            );

            obtenerVendedores();

        } catch (error) {

            console.log(error);

        }

    };

    const seleccionarVendedor = (vendedor) => {

        setNombre(vendedor.nombre);
        setApellido(vendedor.apellido);
        setTelefono(vendedor.telefono);
        setCorreo(vendedor.correo);
        setIdVendedor(vendedor.idVendedor);
        setEditando(true);

    };

    const actualizarVendedor = async () => {

        try {

            await axios.put(
                `http://localhost:3000/vendedores/${idVendedor}`,
                {
                    nombre,
                    apellido,
                    telefono,
                    correo
                }
            );

            obtenerVendedores();

            limpiarFormulario();

            setEditando(false);

        } catch (error) {

            console.log(error);

        }

    };

    const limpiarFormulario = () => {

        setNombre("");
        setApellido("");
        setTelefono("");
        setCorreo("");

    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                Vendedores
            </h1>

            <div className="card p-4 shadow-sm mb-4">

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) =>
                        setApellido(e.target.value)
                    }
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) =>
                        setTelefono(e.target.value)
                    }
                />

                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) =>
                        setCorreo(e.target.value)
                    }
                />

                {
                    editando ? (

                        <button
                            className="btn btn-warning"
                            onClick={actualizarVendedor}
                        >
                            Actualizar vendedor
                        </button>

                    ) : (

                        <button
                            className="btn btn-primary"
                            onClick={agregarVendedor}
                        >
                            Agregar vendedor
                        </button>

                    )
                }

            </div>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        vendedores.map((vendedor) => (

                            <tr
                                key={vendedor.id}
                            >

                                <td>
                                    {vendedor.idVendedor}
                                </td>

                                <td>
                                    {vendedor.nombre}
                                </td>

                                <td>
                                    {vendedor.apellido}
                                </td>

                                <td>
                                    {vendedor.telefono}
                                </td>

                                <td>
                                    {vendedor.correo}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() =>
                                            seleccionarVendedor(
                                                vendedor
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminarVendedor(
                                                vendedor.idVendedor
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

export default Vendedores;