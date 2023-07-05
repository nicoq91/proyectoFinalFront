import React, { useState, useEffect, } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import './css/ProductsTable.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Button, TextField, Modal, Box } from '@mui/material';
import { blue, red } from '@mui/material/colors';

//se declara base para almacenar la url base de la api a la cual se realizan solicitudes http . 
const baseURL = "http://localhost:3001";

interface Product {
    _id: string;
    producto_nombre: string;
    precio_producto: number;
    marca: string;
    categoria: string;
    stock: number;
    tamaño: string;
    proveedor: string;
}
interface NewProduct {
    producto_nombre: string;
    precio_producto: number;
    marca: string;
    categoria: string;
    stock: number;
    tamaño: string;
    proveedor: string;
}
export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState<Product>({
        _id: '',
        producto_nombre: '',
        precio_producto: 0,
        marca: '',
        categoria: '',
        stock: 0,
        tamaño: '',
        proveedor: '',
    });
    const [newProduct, setNewProduct] = useState<NewProduct>({
        producto_nombre: 'fer   ',
        precio_producto: 0,
        marca: 'fer',
        categoria: 'asdg',
        stock: 0,
        tamaño: '24',
        proveedor: '34',
    });
    useEffect(() => {
        axios.get(`${baseURL}/productos/`).then((response) => {
            const updatedProducts = response.data.map((product: Product) => ({
                ...product,
                key: product._id,
            }));
            setProducts(updatedProducts);
            // setProducts(response.data);
        });
    }, []);
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setEditedProduct({ ...product });
        console.log('producto editado');
    };
    const handleUpdate = () => {
        axios.put(`${baseURL}/productos/${editingProduct?._id}`, editedProduct)
            .then((response) => {
                const updatedProducts = products.map((product) =>
                    product._id === editingProduct?._id ? response.data : product
                );
                setProducts(updatedProducts);
                setEditingProduct(null);
                setEditedProduct({
                    _id: '',
                    producto_nombre: '',
                    precio_producto: 0,
                    marca: '',
                    categoria: '',
                    stock: 0,
                    tamaño: '',
                    proveedor: '',
                });
            })
            .catch((error) => {
                console.error('Error al editar el producto:', error);
            });
    };
    // const handleAddProduct = (newProduct: NewProduct) => {
    //     axios.post(`${baseURL}/productos/create`, newProduct)
    //         .then((response) => {
    //             const addedProduct = response.data;
    //             setProducts([...products, addedProduct]);
    //             setNewProduct({
    //                 producto_nombre: '',
    //                 precio_producto: 0,
    //                 marca: '',
    //                 categoria: '',
    //                 stock: 0,
    //                 tamaño: '',
    //                 proveedor: '',
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error al agregar el producto:', error);
    //         });
    // };
    const handleAddProduct = () => {
        axios
            .post(`${baseURL}/productos/create`, newProduct)
            .then((response) => {
                const addedProduct = response.data;
                setProducts([...products, addedProduct]);
                setNewProduct({
                    producto_nombre: '',
                    precio_producto: 0,
                    marca: '',
                    categoria: '',
                    stock: 0,
                    tamaño: '',
                    proveedor: '',
                });
            })
            .catch((error) => {
                console.error('Error al agregar el producto:', error);
            });
    };

    //handleChangeNewProduct es un controlador de eventos se usa para manejar cambios en los campos de entrada del formulario 
    const handleChangeNewProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (productId: string) => {
        console.log('ID del producto:', productId);
        // Verificar si el ID del producto está en el formato adecuado
        if (!productId) {
            console.error('ID del producto no válido');
            return;
        }
        // Verificar si el ID del producto existe en la lista de productos
        const productExists = products.some((product) => product._id === productId);
        if (!productExists) {
            console.error('El producto no existe');
            return;
        }
        axios
            .post(`${baseURL}/productos/delete/${productId}`)
            .then((response) => {
                if (response.status === 200) {
                    const updatedProducts = products.filter((product) => product._id !== productId);
                    setProducts(updatedProducts);
                    console.log('Producto eliminado correctamente');
                } else {
                    console.error('La solicitud de eliminación no fue exitosa');
                }
            })
            .catch((error) => {
                console.error('Error al enviar la solicitud de eliminación', error);
            });
    };
    return (
        <>
            <h2 className="contenedorProductos">Productos</h2>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color="success" onClick={handleAddProduct}>
                    Agregar nuevos productos
                </Button>

            </Stack>
            {/* modal para agregar producto */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h3>Agregar nuevo producto</h3>
                    <TextField
                        label="Nombre del producto"
                        name="producto_nombre"
                        value={newProduct.producto_nombre}
                        onChange={handleChangeNewProduct}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Precio"
                        name="precio_producto"
                        value={newProduct.precio_producto}
                        onChange={handleChangeNewProduct}
                        fullWidth
                        margin="normal"
                    />
                    {/* Agregar los demás campos del formulario aquí */}
                    <Button variant="contained" color="success" onClick={handleAddProduct} >
                        Agregar
                    </Button>
                </Box>
            </Modal>
            <TableContainer component={Paper} sx={{ margin: '18px', maxWidth: '90%' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Categoría</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Tamaño</TableCell>
                            <TableCell align="right">Proveedor</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => {
                            console.log('agregado'); // Agregar console.log aquí
                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{product.producto_nombre}</TableCell>
                                    <TableCell align="right">${product.precio_producto}</TableCell>
                                    <TableCell align="right">{product.marca}</TableCell>
                                    <TableCell align="right">{product.categoria}</TableCell>
                                    <TableCell align="right">{product.stock}</TableCell>
                                    <TableCell align="right">{product.tamaño}</TableCell>
                                    <TableCell align="right">{product.proveedor}</TableCell>
                                    <TableCell align="center">
                                        {/* botones para editar y eliminar ambos funcionando  */}
                                        <EditIcon sx={{ color: blue[500] }} className="iconos" onClick={() => handleEdit(product)} />
                                        <DeleteIcon sx={{ color: red[500] }} className="iconos" onClick={() => handleDelete(product._id)} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
