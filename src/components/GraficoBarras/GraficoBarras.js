import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GraficoBarras.css";

const GraficoBarras = ({ payments }) => {
  // Procesar los datos para agrupar por año y calcular ingresos y egresos
  const data = payments.reduce((acc, payment) => {
    const year = new Date(payment.fecha).getFullYear(); // Obtener el año
    const entry = acc.find((d) => d.year === year);

    const monto = Number(payment.valor); // Asegurarse de que sea un número

    if (!entry) {
      acc.push({
        year,
        ingresos: monto >= 0 ? monto : 0, // Ingresos (positivos)
        egresos: monto < 0 ? Math.abs(monto) : 0, // Egresos (negativos como positivo)
      });
    } else {
      if (monto >= 0) {
        entry.ingresos += monto; // Sumar ingresos
      } else {
        entry.egresos += Math.abs(monto); // Sumar egresos
      }
    }

    return acc;
  }, []);

  return (
    <div className="grafico-barras">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString("es-CO")}`} />
          <Legend />
          <Bar dataKey="ingresos" fill="#82ca9d" name="Ingresos" />
          <Bar dataKey="egresos" fill="#ff6961" name="Egresos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoBarras;
