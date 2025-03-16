import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu"; // Importar el componente del menú
import PagosRealizados from "./pages/PagosRealizados/PagosRealizados";
import Comportamiento from "./pages/Comportamiento/Comportamiento";
import Administracion from "./pages/Administracion/Administracion";
import "./App.css"; // Importar los estilos globales si los tienes

const App = () => {
  const basename = "/pwa-seguridad-sheet"; // Ruta base del repositorio
  return (
    <Router basename={basename}>
      {/* Integración del menú y configuración de rutas */}
      <div className="app">
        <Menu /> {/* Menú tipo hamburguesa moderno */}
        
        <div className="content">
          <Routes>
            <Route path="/pagos-realizados" element={<PagosRealizados />} />
            <Route path="/comportamiento" element={<Comportamiento />} />
            <Route path="/administracion" element={<Administracion />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
