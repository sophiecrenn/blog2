import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Connexion from "./Pages/Connexion";
import BlogCreation from "./Pages/BlogCreation";
import BlogList from "./Pages/BlogList";
import BlogDetail from "./Pages/BlogDetail";
import BlogUpdate from "./Pages/BlogUpdate.jsx";
import CreateAccount from "./Pages/CreateAccount";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardAdmin from './Pages/DashboardAdmin.jsx';
import DashboardUser from './Pages/DashboardUser.jsx';
import { AuthProvider } from "./Hooks/AuthProvider.jsx";
import ProtectedRoute from "./Hooks/ProtectedRoute.jsx";
import styles from './assets/styles/body.module.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/blog" element={<BlogList />} />
                <Route path="/dashboardUser" element={<DashboardUser />} />
              </Route>
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/create" element={<BlogCreation />} />
                <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
                <Route path="/blog/edit/:id" element={<BlogUpdate />} />
              </Route>
              <Route path="/account" element={<CreateAccount />} />
              <Route path="/login" element={<Connexion />} />
            </Routes>
          </main>
          <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
