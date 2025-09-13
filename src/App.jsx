import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homepage";
import { AdminDashboard } from "./pages/admin/adminDashboard";
import { Loginpage } from "./pages/login";
import { SearchResults } from "./pages/searchResults";
import { BookDetails } from "./pages/bookDetails";
import { RegisterPage } from "./pages/register";
import { Toaster } from "react-hot-toast";
import { AdminLoginpage } from "./pages/admin/adminLogin";
import { AdminRegister } from "./pages/admin/adminRegister";
import { EditBook } from "./pages/admin/editBook";
import { AddBook } from "./pages/admin/addbook";
import { NotFound } from "./pages/notFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/view/:bookName" element={<SearchResults />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/myadmin/dashboard" element={<AdminDashboard />} />
        <Route path="/myadmin/login" element={<AdminLoginpage />} />
        <Route path="/myadmin/register" element={<AdminRegister />} />
        <Route path="/myadmin/editbook" element={<EditBook />} />
        <Route path="/myadmin/dashboard/addbook" element={<AddBook />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/myadmin" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
