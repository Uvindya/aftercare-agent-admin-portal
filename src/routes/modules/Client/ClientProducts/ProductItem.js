import React, { useEffect, useState } from 'react';

const ProductItem = ({ item }) => {
  const { id, name, serialNumber } = item;
  return (
    <div>
      <h3>{name}</h3>
      <h4>Id: {id}</h4>
      <h4>Serial No: {serialNumber}</h4>
    </div>
  );
};

export default ProductItem;
