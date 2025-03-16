import React, { useEffect, useState } from "react";
import { getPayments } from "../../services/sheetService";
import GraficoBarras from "../../components/GraficoBarras/GraficoBarras";
import TablaPagos from "../../components/TablaPagos/TablaPagos";
import ComparativoConcepto from "../../components/ComparativoConcepto/ComparativoConcepto";
import "./Comportamiento.css";

const Comportamiento = () => {
  const [payments, setPayments] = useState([]);
  const [yearFilter, setYearFilter] = useState("-Todos-");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayments();
      setPayments(data);
    };
    fetchData();
  }, []);

  // Filtrar pagos según el año seleccionado
  const filteredPayments =
    yearFilter === "-Todos-"
      ? payments
      : payments.filter(
          (payment) => new Date(payment.fecha).getFullYear().toString() === yearFilter
        );

  // Filtrar solo egresos (salidas de dinero)
  const egresos = filteredPayments.filter((payment) => payment.valor < 0);

  // Calcular totales
  const totalIngresos = filteredPayments.reduce(
    (sum, payment) => (payment.valor >= 0 ? sum + Number(payment.valor) : sum),
    0
  );
  const totalEgresos = filteredPayments.reduce(
    (sum, payment) => (payment.valor < 0 ? sum + Math.abs(Number(payment.valor)) : sum),
    0
  );
  const saldo = totalIngresos - totalEgresos;

  return (
    <div className="comportamiento-page">
      <h1>Comportamiento Financiero</h1>

      <div className="cuadrantes">
        {/* Primer Cuadrante: Gráfico de Barras */}
        <div className="cuadrante">
          <GraficoBarras payments={filteredPayments} />
        </div>

        {/* Segundo Cuadrante: Tabla con egresos */}
        <div className="cuadrante">
          <h2>Salidas de Dinero</h2>
          <TablaPagos
            payments={egresos.map((payment) => ({
              concepto: payment.concepto,
              fecha: payment.fecha,
              valor: payment.valor,
            }))}
            columns={["concepto", "fecha", "valor"]}
            total={totalEgresos}
          />
        </div>

        {/* Tercer Cuadrante: Tarjetas con totales */}
        <div className="cuadrante">
          <h2>Resumen Financiero</h2>
          <div className="cards">
            <div className="card ingresos">
              <h3>Total Ingresos</h3>
              <p>${totalIngresos.toLocaleString("es-CO")}</p>
            </div>
            <div className="card egresos">
              <h3>Total Egresos</h3>
              <p>${totalEgresos.toLocaleString("es-CO")}</p>
            </div>
            <div className="card saldo">
              <h3>Saldo</h3>
              <p>${saldo.toLocaleString("es-CO")}</p>
            </div>
          </div>
        </div>

        {/* Cuarto Cuadrante: Comparativo por concepto */}
        <div className="cuadrante">
          <ComparativoConcepto payments={payments} />
        </div>
      </div>
    </div>
  );
};

export default Comportamiento;
