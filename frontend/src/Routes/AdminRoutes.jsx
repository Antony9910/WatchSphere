import React from "react";

import { Route, Routes } from "react-router-dom";
import Place from "../Admin/Pages/place/Place";
import Category from "../admin/Pages/category/category";
import Brand from "../admin/Pages/Brand/brand";
import Subcategory from "../admin/pages/subcategory/subcategory";
 import NewAd from "../admin/pages/NewAd/NewAd";
 
import Shop from "../admin/Pages/shop/Shop";
import Customer from "../admin/Pages/Customer/Customer";

import SelectActionCard from "../Admin/Pages/Home/Home";
import District from "../Admin/Pages/district/District";
import SellerList from "../Admin/Pages/Seller/seller";
import AgentList from "../Admin/Pages/Agent/agent";



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
      <Route path="Seller" element={<SellerList/>}/>
      <Route path="Shop" element={<Shop/>}/>
      <Route path="Customer" element={<Customer/>}/>
      <Route path="Agent" element={<AgentList/>}/>
    </Routes>
    </div>
  );
};

export default AdminRoutes;
