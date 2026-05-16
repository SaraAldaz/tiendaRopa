const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.get("/categorias", (req, res) => {

    const sql = `
        SELECT * FROM categorias
    `;

    db.query(sql, (error, resultado) => {

        if(error){
            console.log(error);
        } else {
            res.json(resultado);
        }

    });

});

app.post("/categorias", (req, res) => {

    const { nombreCategoria } = req.body;

    const sql = `
        INSERT INTO categorias(nombreCategoria)
        VALUES(?)
    `;

    db.query(sql, [nombreCategoria], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Categoría agregada"
            });

        }

    });

});

app.delete("/categorias/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM categorias
        WHERE idCategoria = ?
    `;

    db.query(sql, [id], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Categoría eliminada"
            });

        }

    });

});

app.put("/categorias/:id", (req, res) => {

    const id = req.params.id;

    const { nombreCategoria } = req.body;

    const sql = `
        UPDATE categorias
        SET nombreCategoria = ?
        WHERE idCategoria = ?
    `;

    db.query(sql, [nombreCategoria, id], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Categoría actualizada"
            });

        }

    });

});

app.get("/productos", (req, res) => {
    const sql = `
        select productos.*, categorias.nombreCategoria
        from productos left join categorias
        on productos.idCategoria = categorias.idCategoria
    `;
    db.query(sql, (err, respuesta) => {
        if (err) {
            console.error("Problemitas", err);   
        }else{
            res.json(respuesta);
        }
    });
});


app.post("/productos", (req, res) => {
    const {nombreProducto, precio, stock, foto, idCategoria} = req.body;
    const sql = `
        insert into productos(nombreProducto, precio, stock, foto, idCategoria) values (?,?,?,?,?) `;
    
    db.query(sql, [nombreProducto, precio, stock, foto, idCategoria],
    (err, respuesta) => {
        if(err){
            console.error("Problemitas", err);
        } else {
            res.json({
                mensaje: "Agregado",
            });
        }
    });
});

app.delete("/productos/:idProducto", (req, res) => {
    const id = req.params.idProducto;
    const sql = `delete from productos where idProducto = ?`;
    db.query(sql, [id], (err, respuesta) => {
        if(err){
            console.error("Problemitas", err);
        } else {
            res.json({
                mensaje: "Eliminado",
            });
        }
    });
});

app.put("/productos/:idProducto", (req, res) => {
    const id = req.params.idProducto;
    const {nombreProducto, precio, stock, foto, idCategoria} = req.body;
    const sql = `update productos set nombreProducto = ?, precio = ?, stock = ?,
     foto = ?, idCategoria = ? where idProducto = ?`;
    db.query(sql, [nombreProducto, precio, stock, foto, idCategoria, id], 
        (err, respuesta) => {
        if(err){
            console.error("Problemitas", err);
        } else {
            res.json({
                mensaje: "Actualizado",
            });
        }
    });
});

app.get("/vendedores", (req, res) => {

    const sql = `
        SELECT * FROM vendedores
    `;

    db.query(sql, (error, resultado) => {

        if(error){
            console.log(error);
        } else {
            res.json(resultado);
        }

    });

});

app.post("/vendedores", (req, res) => {

    const { nombre, apellido, correo, telefono } = req.body;

    const sql = `
        INSERT INTO vendedores(nombre, apellido, correo, telefono)
        VALUES(?, ?, ?, ?)
    `;

    db.query(sql, [nombre, apellido, correo, telefono], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Vendedor agregado"
            });

        }

    });

});

app.delete("/vendedores/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM vendedores  
        WHERE idVendedor = ?
    `;

    db.query(sql, [id], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Vendedor eliminado"
            });

        }

    });

});

app.put("/vendedores/:id", (req, res) => {

    const id = req.params.id;

    const { nombre, apellido, correo, telefono } = req.body;

    const sql = `
        UPDATE vendedores
        SET nombre = ?, apellido = ?, correo = ?, telefono = ?
        WHERE idVendedor = ?
    `;

    db.query(sql, [nombre, apellido, correo, telefono, id], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Vendedor actualizado"
            });

        }

    });

});

app.get("/ventas", (req, res) => {

    const sql = `
        SELECT * FROM ventas
    `;

    db.query(sql, (error, resultado) => {

        if(error){
            console.log(error);
        } else {
            res.json(resultado);
        }

    });

});

app.post("/ventas", (req, res) => {

    const { fechaVenta, total, idProducto, idVendedor } = req.body;

    const sql = `
        INSERT INTO ventas(fechaVenta, total, idProducto, idVendedor)
        VALUES(?, ?, ?, ?)
    `;

    db.query(sql, [fechaVenta, total, idProducto, idVendedor], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Venta agregada"
            });

        }

    });

});

app.delete("/ventas/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM ventas
        WHERE idVenta = ?
    `;

    db.query(sql, [id], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Venta eliminada"
            });

        }

    });

});

app.put("/ventas/:id", (req, res) => {

    const id = req.params.id;

    const { fechaVenta, total, idProducto, idVendedor } = req.body;

    const sql = `
        UPDATE ventas
        SET fechaVenta = ?, total = ?, idProducto = ?, idVendedor = ?
        WHERE idVenta = ?
    `;

    db.query(sql, [fechaVenta, total, idProducto, idVendedor, id], (error, resultado) => {

        if(error){
            console.log(error);
        } else {

            res.json({
                mensaje: "Venta actualizada"
            });

        }

    });

});

app.listen(3000, () => {
    console.log("Puerto 3000");
});

