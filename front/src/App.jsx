import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Connexion from "./Pages/Connexion";
import BlogCreation from "./Pages/BlogCreation";
import BlogList from "./Pages/BlogList";
import BlogDetail from "./Pages/BlogDetail";
import BlogUpdate from "./Pages/BlogUpdate";
import CreateAccount from "./Pages/CreateAccount";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
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
