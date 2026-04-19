/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast.tsx';
import { Layout } from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import CreateTask from './pages/CreateTask.tsx';
import EditTask from './pages/EditTask.tsx';
import NotFound from './pages/NotFound.tsx';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
}
