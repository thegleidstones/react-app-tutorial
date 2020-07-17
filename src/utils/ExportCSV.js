import React from 'react';
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportCSV = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';    const FileExtension = '.xlsx';
 
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + FileExtension);
    }

    return (
        <Button variant="success" onClick={(e) => exportToCSV(csvData, fileName)}> Export Excel</Button>
    )
}

export default ExportCSV;