import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const RelatedProducts = ({ category }) => {
  const { products, path } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  // Update related products whenever the category changes
  useEffect(() => {
    if (products.length > 0) {
      const related = products.filter((product) => product.category.thumbnail === category); // Corrected comparison
      setRelatedProduct(related.slice(0, 4)); // Limit to 4 related products
    }
  }, [category, products]);

  const handleProductClick = (productId) => {
    window.scrollTo(0, 0);
    navigate(`/singleProduct/${productId}`);
  };


  return (
    <div className="container">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProduct.length > 0 ? (
          relatedProduct.map((product) => (
            <div key={product._id} className="group bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link to={`/singleProduct/${product._id}`}>
              <div onClick={() => handleProductClick(product._id)}>
                <img
                  src={path + product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-80 transition-opacity duration-200"
                />
                </div>
              </Link>
              <div className="text-center">
                <p className="text-gray-800 font-semibold text-lg truncate">{product.title}</p>
                <p className="text-[#088178] text-xl mt-2">₹{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-4 text-center">No related products available.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
