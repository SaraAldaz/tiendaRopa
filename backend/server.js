const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hola mundo");
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
    const {nombre, precio, stock, foto, idCategoria} = req.body;
    const sql = `
        insert into productos(nombre, precio, stock, foto, idCategoria) values (?,?,?,?,?) `;
    
    db.query(sql, [nombre, precio, stock, foto, idCategoria],
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
    const {nombre, precio, stock, foto, idCategoria} = req.body;
    const sql = `update productos set nombre = ?, precio = ?, stock = ?,
     foto = ?, idCategoria = ? where idProducto = ?`;
    db.query(sql, [nombre, precio, stock, foto, idCategoria, id], 
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

app.listen(3000, () => {
    console.log("Puerto 3000");
});

