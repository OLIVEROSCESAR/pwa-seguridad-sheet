import React from "react";
import "./ComparativoConcepto.css";

const ComparativoConcepto = ({ payments }) => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  // Filtrar los pagos del concepto "PAGO AFILIACION" por año
  const countCurrentYear = payments.filter(
    (payment) =>
      payment.concepto === "PAGO AFILIACION" &&
      new Date(payment.fecha).getFullYear() === currentYear
  ).length;

  const countLastYear = payments.filter(
    (payment) =>
      payment.concepto === "PAGO AFILIACION" &&
      new Date(payment.fecha).getFullYear() === lastYear
  ).length;

  return (
    <div className="comparativo">
      <h2>Comparativo: PAGO AFILIACION</h2>
      <div className="comparativo-cards">
        <div className="card afiliacion-actual">
          <h3>Año Actual ({currentYear})</h3>
          <p>{countCurrentYear} Afiliados</p>
        </div>
        <div className="card afiliacion-anterior">
          <h3>Año Anterior ({lastYear})</h3>
          <p>{countLastYear} Afiliados</p>
        </div>
      </div>
    </div>
  );
};

export default ComparativoConcepto;
