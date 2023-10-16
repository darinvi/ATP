function applyFilters(data, filterVariable, comparisonType, filterValue) {
    return data.filter(trade => {
        switch (filterVariable) {
            case 'net':
                return comparisonType === 'Greater' ? trade.net > filterValue : trade.net < filterValue;
            case 'net (absolute)':
                return comparisonType === 'Greater' ? Math.abs(trade.net) > filterValue : Math.abs(trade.net) < filterValue;
            case 'gross':
                return comparisonType === 'Greater' ? trade.gross > filterValue : trade.gross < filterValue;
            case 'gross (absolute)':
                return comparisonType === 'Greater' ? Math.abs(trade.gross) > filterValue : Math.abs(trade.gross) < filterValue;
            case 'time opened':
                // Implement time comparison logic here
                break;
            case 'time closed':
                // Implement time comparison logic here
                break;
            case 'duration held':
                // Implement duration comparison logic here
                break;
            case 'entry price':
                return comparisonType === 'Greater' ? trade.entry_price > filterValue : trade.entry_price < filterValue;
            case 'quantity':
                return comparisonType === 'Greater' ? trade.quantity > filterValue : trade.quantity < filterValue;
            default:
                return true; // No filter applied if the variable is not recognized
        }
    });
}


export function applySelectedFilters(data, selectedFilters) {
    let filteredData = [...data];

    selectedFilters.forEach(filter => {
        const { filterVariable, comparisonType, filterValue } = filter;
        filteredData = applyFilters(filteredData, filterVariable, comparisonType, filterValue);
    });

    return filteredData;
}