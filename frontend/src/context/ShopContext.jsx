import React, { createContext, useEffect, useState } from 'react';
import api from '../utility/api';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  // const [categories] = useState([]);

  const [category, setCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [path, setPath] = useState('');

  const getProducts = async () => {
    try {
      const params = { search, sort: sortOrder };
      const res = await api.get('/get-products',{ params});
      console.log('pro', res);
      setProducts(res.data.data);
      setPath(res.data.filepath);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const getProductByCategory = async (categoryid) => {
    try {
      const res = await api.get(`/get-products-by-category/${categoryid}`);
      console.log('pro', res);
      setProducts(res.data.data);
      setPath(res.data.filepath);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
  // fetch categories and brand data from backend

  const getCategory = async () => {
    const param = {...(category !== "all" && { category })}
    try {
      const res = await api.get('/get-categories',{param});
      console.log('cat', res);
      setCategory(res.data.data);
      setPath(res.data.filepath);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };


  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getProducts();
  }, [sortOrder,search]);

  const value = { setProducts,products, category,setCategory, sortOrder,setSortOrder, search,setSearch, path,showSearch,setShowSearch,
    getProductByCategory

  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
