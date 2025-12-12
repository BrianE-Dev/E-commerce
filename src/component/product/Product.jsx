import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../ui/ProductCard";
import SearchFilter from "../ui/SearchFilter";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AppContext } from "../../context/AppContext";
import axios from 'axios'

function Product() {
  const initialProducts = [
    {
      id: 1,
      name: "Smart Watch",
      price: "164",
      discPercent: 16,
      inStock: true,
      category: "Electronics",
      imageUrl: "./src/assets/im1.jpg",
    },
    {
      id: 2,
      name: "PS5",
      price: "1200",
      inStock: true,
      discPercent: 4,
      category: "Electronics",
      imageUrl: "./src/assets/ps5.jpg",
    },
    {
      id: 3,
      name: "JBL Headphone",
      price: "85",
      discPercent: 5,
      inStock: true,
      category: "Electronics",
      imageUrl: "./src/assets/im2.jpg",
    },
    {
      id: 4,
      name: "Samsung Smart TV",
      price: "1450",
      discPercent: 20,
      inStock: false,
      category: "Electronics",
      imageUrl: "./src/assets/im3.jpg",
    },
  ];
  const [realProduct, setRealProduct] = useState(initialProducts);
  const [product, setProduct] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AppContext)
  const token = localStorage.getItem("userToken")

  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Product from axios call", response.data)
      setRealProduct(response.data.products)
    } catch (error) {
      console.error('Error:', error)
      throw error;
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchProduct()
    // fetch("https://dummyjson.com/products")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setRealProduct(response.data.products);
    //     console.log(response.data.products);
    //   });
      
  }, []);


  const handleSearchChange = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredProducts = product.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-transparent p-8">
      <h1>Product Inventory</h1>
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No product(s) found
          </p>
        )}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {realProduct.length > 0 ? (
          realProduct.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No product(s) found
          </p>
        )}
      </div>
      <div>
        {loading && (
          <Grid container wrap="nowrap" col-4 className="">
            {product.map((item) => (
              <Box
                key={item.index}
                sx={{ width: 210, marginRight: 0.5, my: 5 }}
              >
                <Skeleton variant="rectangular" width={210} height={118} />

                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Product;
