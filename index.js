window.onload = function () {
    const root = document.getElementById('root');
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let today = new Date();
    let year = today.getFullYear();
    let mon = today.getMonth() <= 11 ? today.getMonth() + 1 : 1;
    let h = 1;
    return addWrapperAll(root);

    function addWrapperAll(parent) {
        const wrapperAll = document.createElement('div');
        parent.appendChild(wrapperAll);
        wrapperAll.id = 'wrapperAll';

        addPopupWrapper(wrapperAll);
        addHeadWrapper(wrapperAll);
        addTableWrapper(wrapperAll);
        
    }

    function addHeadWrapper(parent) {
        const headWrapper = document.createElement('div');
        parent.appendChild(headWrapper);
        headWrapper.id = 'headWrapper';

        addTodayButton(headWrapper);
        addLeftButton(headWrapper);
        addRightButton(headWrapper);
        addYearAndMonth(headWrapper);
    }

    function addTodayButton(parent) {
        const todayButton = document.createElement('button');
        parent.appendChild(todayButton);
        todayButton.id = "todayButton";
        todayButton.innerText = "TODAY";

        todayButton.addEventListener('click', changeToday);

        function changeToday() {
            today = new Date();
            year = today.getFullYear();
            mon = today.getMonth() <= 11 ? today.getMonth() + 1 : 1;
            h = 1;

            const yearAndMonth = document.getElementById('yearAndMonth');
            yearAndMonth.innerHTML = year + '.' + ('0' + mon).slice(-2);

            const table = document.getElementById('table');
            const tbody = document.getElementById('tbody');

            table.removeChild(tbody);
            addTableBody(table);

        }
    }

    function addLeftButton(parent) {
        const leftButton = document.createElement('button');
        parent.appendChild(leftButton);
        leftButton.id = "leftButton";
        leftButton.innerText = "<";

        leftButton.addEventListener('click', subsMonth);

        function subsMonth() {
            h = 1;
            mon === 1 ? (mon = 12, year -= 1) : mon -= 1;

            const yearAndMonth = document.getElementById('yearAndMonth');
            yearAndMonth.innerHTML = year + '.' + ('0' + mon).slice(-2);

            const table = document.getElementById('table');
            const tbody = document.getElementById('tbody');

            table.removeChild(tbody);
            addTableBody(table);
        }
    }

    function addRightButton(parent) {
        const rightButton = document.createElement('button');
        parent.appendChild(rightButton);
        rightButton.id = "rightButton";
        rightButton.innerText = ">";

        rightButton.addEventListener('click', addMonth);

        function addMonth() {
            h = 1;
            mon >= 12 ? (mon = 1, year += 1) : mon += 1;

            const yearAndMonth = document.getElementById('yearAndMonth');
            yearAndMonth.innerHTML = year + '.' + ('0' + mon).slice(-2);

            const table = document.getElementById('table');
            const tbody = document.getElementById('tbody');

            table.removeChild(tbody);
            addTableBody(table);
        }
    }

    function addYearAndMonth(parent) {
        const yearAndMonth = document.createElement('div');
        parent.appendChild(yearAndMonth);
        yearAndMonth.id = 'yearAndMonth';
        yearAndMonth.innerHTML = year + '.' + ('0' + mon).slice(-2);
    }

    function addTableWrapper(parent) {
        const tableWrapper = document.createElement('div');
        parent.appendChild(tableWrapper);
        tableWrapper.id = 'tableWrapper';
        addTable(tableWrapper);
    }

    function addTable(parent) {
        const table = document.createElement('table');
        table.id = 'table';
        parent.appendChild(table);
        table.className = 'table';

        addTableHead(table);
        addTableBody(table);
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
        }
    }

    function addTableBody(parent) {
        const tbody = document.createElement('tbody');
        tbody.id = 'tbody';
        parent.appendChild(tbody);

        addData(tbody);
    }

    function addData(parent) {
        for (let i = 1; i < 7; i++) {
            const tr = document.createElement('tr');
            parent.appendChild(tr);
            tr.id = `row${i}`;
            tr.className = `tableRow`;

            const startDate = new Date(year, mon - 1, 1);
            const dayIndex = startDate.getDay();

            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');
                td.id = `${tr.id}td${j}`;
                td.className = `tableData ${day[j]}`;

                tr.appendChild(td);

                for (let k = 0; k < 7; k++) {
                    if (dayIndex === k) {
                        let eachDay = new Date(year, mon - 1, h - k);
                        let today = new Date();
                        td.innerText = eachDay.getDate();

                        if (eachDay.getMonth() + 1 !== mon) {
                            td.style.opacity = '0.5';
                        }
                        if(eachDay.getFullYear() === today.getFullYear() &&
                        eachDay.getMonth() === today.getMonth() &&
                        eachDay.getDate() === today.getDate()){
                            td.style.color = 'navy'; 
                            td.style.fontWeight = 'bolder';
                            td.style.textDecoration = 'underline';
                        }
                    }
                }
                h++;
            }
        }
    }

    function addPopupWrapper(parent){
        const popupWrapper = document.createElement('div');
        popupWrapper.id = 'popupWrapper';
        parent.appendChild(popupWrapper);

        
        colorWrapper(popupWrapper);
        dateWrapper(popupWrapper);
        popInput(popupWrapper);
        popButtonWrapper(popupWrapper)
    }

    function colorWrapper(parent){
        const colorWrapper = document.createElement('div');
        colorWrapper.id = 'colorWrapper';
        parent.appendChild(colorWrapper);

        colorRange(colorWrapper);
        colorPreview(colorWrapper);
        addCloseButton(colorWrapper);
    }

    function addCloseButton(parent){
        const closeButton = document.createElement('button');
        closeButton.id = 'closeButton';
        closeButton.innerText = 'X';
        parent.appendChild(closeButton);
    }
    
    function colorRange(parent){
        const dropDown = document.createElement('input');
        dropDown.type = 'range';
        dropDown.min = '0';
        dropDown.max = '359';
        dropDown.id = 'colors';
        parent.appendChild(dropDown);
    }

    function colorPreview(parent){
        const colorPreview = document.createElement('div');
        colorPreview.id = 'colorPreview';
        parent.appendChild(colorPreview);
    }

    function dateWrapper(parent){
        const dateWrapper = document.createElement('div');
        dateWrapper.id = 'dateWrapper';
        parent.appendChild(dateWrapper);

        popStartDate(dateWrapper);
        popEndDate(dateWrapper);
    }

    function popStartDate(parent){
        const startDate = document.createElement('input');
        startDate.type = 'date';
        startDate.id = 'startDate';
        parent.appendChild(startDate);
    }

    function popEndDate(parent){
        const endDate = document.createElement('input');
        endDate.type = 'date';
        endDate.id = 'endDate';
        parent.appendChild(endDate);
    }

    function popInput(parent){
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'textInput';
        parent.appendChild(input);
    }

    function popButtonWrapper(parent){
        const buttonWrapper = document.createElement('div');
        buttonWrapper.id = 'buttonWrapper';
        parent.appendChild(buttonWrapper);

        popButton(buttonWrapper)
    }

    function popButton(parent){
        const doneButton = document.createElement('button');
        doneButton.id = 'doneButton';
        doneButton.innerText = 'Save';
        parent.appendChild(doneButton);
    }
}
