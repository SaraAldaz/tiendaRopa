import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

    const [totalProductos, setTotalProductos] = useState(0);
    const [totalCategorias, setTotalCategorias] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [totalVendedores, setTotalVendedores] = useState(0);

    useEffect(() => {

        obtenerDatos();

    }, []);

    const obtenerDatos = async () => {

        try {

            const productos =
                await axios.get(
                    "http://localhost:3000/productos"
                );

            const categorias =
                await axios.get(
                    "http://localhost:3000/categorias"
                );

            const ventas =
                await axios.get(
                    "http://localhost:3000/ventas"
                );

            const vendedores =
                await axios.get(
                    "http://localhost:3000/vendedores"
                );

            setTotalProductos(
                productos.data.length
            );

            setTotalCategorias(
                categorias.data.length
            );

            setTotalVentas(
                ventas.data.length
            );

            setTotalVendedores(
                vendedores.data.length
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <div className="p-5 mb-5 bg-dark text-white rounded">

                <h1 className="display-4">
                    Gaia Store
                </h1>

                <p className="lead">
                    Sistema de gestión para tienda de ropa
                </p>

            </div>

            <div className="row">

                <div className="col-md-3">

                    <div className="card shadow-sm border-0 mb-4">

                        <div className="card-body">

                            <h5>
                                Productos
                            </h5>

                            <h2>
                                {totalProductos}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm border-0 mb-4">

                        <div className="card-body">

                            <h5>
                                Categorías
                            </h5>

                            <h2>
                                {totalCategorias}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm border-0 mb-4">

                        <div className="card-body">

                            <h5>
                                Ventas
                            </h5>

                            <h2>
                                {totalVentas}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm border-0 mb-4">

                        <div className="card-body">

                            <h5>
                                Vendedores
                            </h5>

                            <h2>
                                {totalVendedores}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Home;