const tableTemplate = (headerHtml, tableBodyContent) => {
    return `<table>
    <tr>${headerHtml}</tr>
    <tbody>${tableBodyContent}</tbody>
    </table>`
}

const simpleTagTemplateWithContent = (tagName, content) => {
    return `<${tagName}>${content}</${tagName}>`
}

function createHeaderForTable(headerList) {
    let headerHtml= '';
    headerList.forEach(headerName => {
        headerHtml += simpleTagTemplateWithContent('th', formatStringToTitle(headerName))
    });
    return headerHtml
}

function formatStringToTitle(string) {
    return string.replace('_', ' ');
}

function createCellsForTableRow(rowData, dataOrder) {
    let rowHtml = '';
    dataOrder.forEach(dataKey => {
        if (dataKey === 'rating' && rowData['rating'] >= 8) {
            rowHtml += simpleTagTemplateWithContent('td class="high-rating"', rowData[dataKey])
        } else {
            rowHtml += simpleTagTemplateWithContent('td', rowData[dataKey]);
        }
    });
    return simpleTagTemplateWithContent('tr', rowHtml);
}


export function createTable(dataArray, headerNamesForTable) {
    const headerHtml = createHeaderForTable(headerNamesForTable);
    let tableBodyContent = '';
    dataArray.forEach(rowData => tableBodyContent += createCellsForTableRow(rowData, headerNamesForTable));
    return tableTemplate(headerHtml, tableBodyContent);
}




