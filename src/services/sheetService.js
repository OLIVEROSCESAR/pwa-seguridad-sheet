import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = process.env.REACT_APP_ID;
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Pagos?key=${API_KEY}`;

export const getPayments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const rows = response.data.values;
    return rows.map((row) => ({
      id: row[0],
      nombre: row[1],
      fecha: row[2],
      valor: row[3],
      concepto: row[4],
      banco: row[5],
      referencia: row[6],
    }));
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
