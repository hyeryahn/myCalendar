window.onload = function () {
    const root = document.getElementById('root');
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const getYear = today.getFullYear();
    const getMonth = today.getMonth() + 1;

    return addWrapperAll(root);

    function addWrapperAll(parent) {
        const wrapperAll = document.createElement('div');
        parent.appendChild(wrapperAll);
        wrapperAll.id = 'wrapperAll';

        addHeadWrapper(wrapperAll);
        addTableWrapper(wrapperAll);
    }

    function addHeadWrapper(parent) {
        const headWrapper = document.createElement('div');
        parent.appendChild(headWrapper);
        headWrapper.id = 'headWrapper';
        headWrapper.innerHTML = getYear + '년 ' + getMonth + '월';
    }

    function addTableWrapper(parent) {
        const tableWrapper = document.createElement('div');
        parent.appendChild(tableWrapper);
        tableWrapper.id = 'tableWrapper';
        addTable(tableWrapper);
    }

    function addTable(parent) {
        const table = document.createElement('table');
        parent.appendChild(table);
        table.className = 'table';

        addTableHead(table);
        addTableData(table);
    }

    function addTableHead(parent) {
        const thead = document.createElement('thead');
        thead.className = 'thead';
        parent.appendChild(thead);

        const tr = document.createElement('tr');
        thead.appendChild(tr);
        tr.id = "row0";
        tr.className = 'tableRow';

        for (let i = 0; i < 7; i++) {
            const th = document.createElement('th');
            th.innerText = day[i];
            th.id = `th${i}`;
            th.className = `tableHead ${day[i]}`;
            tr.appendChild(th);
        };
    }

    function addTableData(parent) {
        let h = 0;
        const tbody = document.createElement('tbody');
        parent.appendChild(tbody);
        for (let i = 1; i < 7; i++) {
            const tr = document.createElement('tr');
            tbody.appendChild(tr);
            tr.id = `row${i}`;
            tr.className = `tableRow`;
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');
                td.id = `${tr.id}td${j}`;
                td.innerText = countDay().getDate();
                td.className = `tableData ${day[j]}`;
                tr.appendChild(td);
                if(countDay().getMonth()+1 !== getMonth){
                    td.style.color = "lightgray";
                }
                function countDay(){
                    const d = new Date(getYear, getMonth-1,1+h);
                    return d;
                }
                h++;
            };
        }

        
    }

}
