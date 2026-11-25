import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path= "/register" element={<Register/>}/>
                <Route path= "/login" element={<Login/>}/>
                <Route path= "/dashboard" element={<ProtectedRoute><><Navbar /><Dashboard /></></ProtectedRoute>}/>
                <Route path= "/mentors/:id" element={<ProtectedRoute><><Navbar /><... /></></ProtectedRoute>}/>
                <Route path="*" element={<Navigate to ="/login" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}