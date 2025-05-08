import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExportProps {
  data: ExportOptions[];
}

interface ExportOptions {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  planName: string;
  age: number;
}

function Export({ data }: ExportProps) {
  const exportToExcel = () => {
    // Convert Data to Sheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Generate Excel File
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create Blob and Save File
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "members.xlsx");
  };
  return (
    <button
      onClick={exportToExcel}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Export Excel
    </button>
  );
}

export default Export;
