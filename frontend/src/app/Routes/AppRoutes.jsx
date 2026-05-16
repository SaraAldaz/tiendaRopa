import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from '../../components/home/Home'
import Productos from '../../components/productos/Productos'
import Categorias from '../../components/categorias/Categorias'
import Vendedores from '../../components/vendedores/Vendedores'
import Ventas from '../../components/ventas/Ventas'

function AppRoutes() {  
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/vendedores" element={<Vendedores />} />
            <Route path="/ventas" element={<Ventas />} />
        </Routes>
    )
}

export default AppRoutes