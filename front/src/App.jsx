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


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/dashboardUser" element={<DashboardUser />} />
        <Route path="/create" element={<BlogCreation />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/edit/:id" element={<BlogUpdate />} />
        <Route path="/account" element={<CreateAccount />} />
        <Route path="/login" element={<Connexion />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
