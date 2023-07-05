// import React, { useState } from 'react';
// import { TextField, Button, Stack } from '@mui/material';

// interface NewProductFormProps {
//     onAddProduct: (newProduct: NewProduct) => void;
// }

// interface NewProduct {
//     producto_nombre: string;
//     precio_producto: number;
//     marca: string;
//     categoria: string;
//     stock: number;
//     tamaño: string;
//     proveedor: string;
// }

// const NewProductForm: React.FC<NewProductFormProps> = ({ onAddProduct }) => {
//     const [newProduct, setNewProduct] = useState<NewProduct>({
//         producto_nombre: '',
//         precio_producto: 0,
//         marca: '',
//         categoria: '',
//         stock: 0,
//         tamaño: '',
//         proveedor: '',
//     });

//     const handleChangeNewProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setNewProduct({ ...newProduct, [name]: value });
//     };

//     const handleAddProduct = () => {
//         onAddProduct(newProduct);
//         setNewProduct({
//             producto_nombre: '',
//             precio_producto: 0,
//             marca: '',
//             categoria: '',
//             stock: 0,
//             tamaño: '',
//             proveedor: '',
//         });
//     };

//     return (
//         <Stack spacing={2} direction="row">
//             <TextField
//                 label="Nombre del producto"
//                 name="producto_nombre"
//                 value={newProduct.producto_nombre}
//                 onChange={handleChangeNewProduct}
//             />
//             <TextField
//                 label="Precio"
//                 name="precio_producto"
//                 type="number"
//                 value={newProduct.precio_producto}
//                 onChange={handleChangeNewProduct}
//             />
//             <TextField
//                 label="Marca"
//                 name="marca"
//                 value={newProduct.marca}
//                 onChange={handleChangeNewProduct}
//             />
//             <TextField
//                 label="Categoría"
//                 name="categoria"
//                 value={newProduct.categoria}
//                 onChange={handleChangeNewProduct}
//             />
//             <TextField
//                 label="Stock"
//                 name="stock"
//                 type="number"
//                 value={newProduct.stock}
//                 onChange={handleChangeNewProduct}
//             />
//             <TextField
//                 label="Tamaño"
//                 name="tamaño"
//                 value={newProduct.tamaño}
//                 onChange={handleChangeNewProduct}
//             />
//             <TextField
//                 label="Proveedor"
//                 name="proveedor"
//                 value={newProduct.proveedor}
//                 onChange={handleChangeNewProduct}
//             />
//             <Button variant="contained" color="success" onClick={handleAddProduct}>
//                 Agregar nuevos productos
//             </Button>
//         </Stack>
//     );
// };

// export default NewProductForm;
