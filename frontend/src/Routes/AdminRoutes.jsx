import React from "react";
 import District from "../admin/Pages/district/District";
import { Route, Routes } from "react-router-dom";
import Place from "../Admin/Pages/place/Place";
import Category from "../admin/Pages/category/category";
import Brand from "../admin/Pages/Brand/brand";
import Subcategory from "../admin/pages/subcategory/subcategory";
 import NewAd from "../admin/pages/NewAd/NewAd";
 import Seller from "../admin/pages/seller/Seller";
import Shop from "../admin/Pages/shop/Shop";
import Customer from "../admin/Pages/Customer/Customer";
import Agent from "../admin/Pages/Agent/agent";
import SelectActionCard from "../Admin/Pages/Home/Home";



const AdminRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path="/" element={<SelectActionCard />} />
      <Route path="district" element={<District />} />
      <Route path="place" element={<Place />} />
      <Route path="category" element={<Category />} />
      <Route path="Brand" element={<Brand />} />
      <Route path="Subcategory" element={<Subcategory/>}/>
      <Route path="NewAd" element={< NewAd/>}/>
      <Route path="Seller" element={<Seller/>}/>
      <Route path="Shop" element={<Shop/>}/>
      <Route path="Customer" element={<Customer/>}/>
      <Route path="Agent" element={<Agent/>}/>
    </Routes>
    </div>
  );
};

export default AdminRoutes;
