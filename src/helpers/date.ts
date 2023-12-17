export function getMonthList() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Adiciona 1, já que o método getMonth retorna um valor de 0 a 11.

    const monthList = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(year, month - i - 1, 1); // Subtrai i e 1, já que o mês atual é incluído na contagem.
        const monthName = date.toLocaleString('default', { month: 'long' });
        const yearMonth = date.toISOString().slice(0, 7);
        monthList.push({ name: monthName, yearMonth: yearMonth });
    }
    
    return monthList;
}

export function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : (month)}/${year}`
}