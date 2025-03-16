import './TablaPagos.css';

const TablaPagos = ({ payments = [], columns = [], total }) => {
    const columnHeaders = {
      concepto: "Concepto",
      fecha: "Fecha",
      valor: "Valor",
      // Puedes agregar más columnas si las necesitas
    };
  
    // Validar que payments y columns sean arrays
    const safePayments = Array.isArray(payments) ? payments : [];
    const safeColumns = Array.isArray(columns) ? columns : [];
  
    return (
      <div className="tabla-container">
        <table className="tabla-pagos">
          <thead>
            <tr>
              {safeColumns.map((col) => (
                <th key={col}>{columnHeaders[col] || col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safePayments.map((payment, index) => (
              <tr key={index} className={payment.valor < 0 ? "row-negative" : ""}>
                {safeColumns.map((col) => (
                  <td key={col}>
                    {payment[col] !== undefined && payment[col] !== null
                      ? col === "valor"
                        ? `$${Math.abs(Number(payment[col])).toLocaleString("es-CO")}`
                        : payment[col]
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {total !== undefined && (
            <tfoot>
              <tr>
                <td colSpan={safeColumns.length - 1} style={{ fontWeight: "bold", textAlign: "right" }}>
                  Total:
                </td>
                <td style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
                  ${total.toLocaleString("es-CO")}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    );
  };
  
  
  export default TablaPagos;
  