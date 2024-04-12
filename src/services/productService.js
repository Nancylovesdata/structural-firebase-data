import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path based on your project structure
import { doc, deleteDoc,updateDoc  } from "firebase/firestore";

const addProduct = async (productData) => {
  try {
    await addDoc(collection(db, "Products"), productData);
    console.log('Product added successfully');
  } catch (error) {
    console.error('Error adding product: ', error);
  }
};

const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products: ', error);
    return [];
  }
};

const updateProduct = async (productId, updatedProductData) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, updatedProductData);
  
     
  
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

const deleteProduct = async (productId) => {
  try {
    
await deleteDoc(doc(db, "Products", productId));
    // await db.collection('products').doc(productId).delete();
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product: ', error);
  }
};

export { addProduct, getProducts, updateProduct, deleteProduct };
