import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../modules/Dashboard';
import Product from '../modules/Product';
import AddProduct from '../modules/Product/AddProduct';
import Garantie from '../modules/Product/Garantie';
import AddGarantie from '../modules/Product/AddGarantie';
import Actes from '../modules/Product/Actes';
import Codec from '../modules/Product/Codec';
import Subscription from '../modules/Subscription';
import AddSubscription from '../modules/Subscription/AddSubscription';
import Contract from '../modules/Contract';
import DetailContract from '../modules/Contract/DetailContract';
import Statistic from '../modules/Statistic';
import Layout from '../components/Layout';
import NotFoundTitle from '../components/NotFoundTitle';
import Login from '../modules/Auth/Login';

function RoutesPage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="product">
          <Route index element={<Product />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="garantie" element={<Garantie />} />
          <Route path="garantie-add" element={<AddGarantie />} />
          <Route path="acte" element={<Actes />} />
          <Route path="codec" element={<Codec />} />
        </Route>
        <Route path="subscription">
          <Route index element={<Subscription />} />
          <Route path="add" element={<AddSubscription />} />
        </Route>
        <Route path="contract">
          <Route index element={<Contract />} />
          <Route path=":id" element={<DetailContract />} />
        </Route>
        <Route path="statistic" element={<Statistic />} />
        <Route path="*" element={<NotFoundTitle />} />
      </Route>
    </Routes>
  );
}

export default RoutesPage;
