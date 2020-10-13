export const saveCSV = (csv, pathName) => {
    const blob = new Blob([csv], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = pathName + '.csv';
    link.href = url;
    link.click();
}