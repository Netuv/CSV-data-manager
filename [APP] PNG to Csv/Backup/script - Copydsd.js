function convertToCSV() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;

  if (files.length === 0) {
    alert('No files selected.');
    return;
  }

  const csvContent = [];
  let filesProcessed = 0;

  // Iterate through each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileName = file.name;
        const csvRow = [fileName];
        csvContent.push(csvRow);

        filesProcessed++;

        if (filesProcessed === files.length) {
          downloadCSV(csvContent);
        }
      };

      reader.readAsDataURL(file);
    }
  }
}

function downloadCSV(csvData) {
  const csvContent = 'data:text/csv;charset=utf-8,' + convertArrayToCSV(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', 'filenames.csv');
  link.click();
}

function convertArrayToCSV(array) {
  let csv = '';
  array.forEach(row => {
    const csvRow = row.map(value => '"' + value + '"').join(',');
    csv += csvRow + '\r\n';
  });
  return csv;
}
