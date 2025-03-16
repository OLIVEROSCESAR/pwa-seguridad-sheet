import React, { useEffect, useState } from "react";
import { getPayments } from "../../services/sheetService";
import TablaPagos from "../../components/TablaPagos/TablaPagos";
import "./PagosRealizados.css";

const PagosRealizados = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [yearFilter, setYearFilter] = useState("-Todos-");
  const [natureFilter, setNatureFilter] = useState("-Todos-");
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");

  // Obtener los datos de Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayments();
      setPayments(data);
      setFilteredPayments(data);
    };
    fetchData();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let data = payments;

    // Filtrar por año
    if (yearFilter !== "-Todos-") {
      data = data.filter((payment) => new Date(payment.fecha).getFullYear().toString() === yearFilter);
    }

    // Filtrar por naturaleza
    if (natureFilter === "Entradas") {
      data = data.filter((payment) => payment.valor >= 0);
    } else if (natureFilter === "Salidas") {
      data = data.filter((payment) => payment.valor < 0);
    }

    // Filtrar por nombre
    if (nameFilter.trim() !== "") {
      data = data.filter((payment) =>
        payment.nombre.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filtrar por ID
    if (idFilter.trim() !== "") {
      data = data.filter((payment) => payment.id.includes(idFilter));
    }

    setFilteredPayments(data);
  }, [yearFilter, natureFilter, nameFilter, idFilter, payments]);

  // Calcular el total de valores
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + (isNaN(payment.valor) ? 0 : Number(payment.valor)),
    0
  );

  return (
    <div className="pagos-realizados">
      <h1>Gestión de Pagos</h1>

      {/* Filtros */}
      <div className="filtros">
        <label>
          Año:
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="-Todos-">-Todos-</option>
            {[...new Set(payments.map((payment) => new Date(payment.fecha).getFullYear()))].map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </label>
        <label>
          Naturaleza:
          <select
            value={natureFilter}
            onChange={(e) => setNatureFilter(e.target.value)}
          >
            <option value="-Todos-">-Todos-</option>
            <option value="Entradas">Entradas</option>
            <option value="Salidas">Salidas</option>
          </select>
        </label>
        <label>
          Nombre:
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Filtrar por nombre"
          />
        </label>
        <label>
          ID:
          <input
            type="text"
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
            placeholder="Filtrar por ID"
          />
        </label>
      </div>

      {/* Tabla con todas las columnas */}
      <div className="tabla-container">
        <TablaPagos payments={filteredPayments || []} columns={["id", "nombre", "fecha", "valor", "concepto", "banco", "referencia"]} total={totalAmount} />
      </div>
    </div>
  );
};

export default PagosRealizados;
