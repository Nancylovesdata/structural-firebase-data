import React, { useState, useEffect } from 'react';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../services/productService';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);

  // Function to fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchProducts();
  }, []);

  // Function to add a new product
  const handleAddProduct = async () => {
    const newProduct = {
    
      name: 'New Product',
      imageUrl: 'https://example.com/image.jpg',
    };

    try {
      await addProduct(newProduct);
      // Fetch products again after adding
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      // Fetch products again after deleting
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;
