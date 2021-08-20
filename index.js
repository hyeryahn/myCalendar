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
            if (th.id === 'th0') {
                th.className = `tableHead ${day[i]} red`;
            }
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
                td.name = 'yyyy-MM-dd';
                tr.appendChild(td);

                for (let s = 0; s < 4; s++) {
                    const div = document.createElement('div');
                    div.id = `div${i}${j}${s}`;
                    div.className = `div${s}`;
                    td.appendChild(div);
                    if (div.id[5] === '0') {
                        if (td.id === `${tr.id}td0`) {
                            div.className = `div${s} red`;
                        }
                        for (let k = 0; k < 7; k++) {
                            if (dayIndex === k) {
                                let eachDay = new Date(year, mon - 1, h - k);
                                td.name = `${eachDay.getFullYear()}-${('0' + (eachDay.getMonth() + 1)).slice(-2)}-${('0' + eachDay.getDate()).slice(-2)}`;
                                let today = new Date();
                                div.innerText = eachDay.getDate();

                                if (eachDay.getMonth() + 1 !== mon) {
                                    div.style.opacity = '0.5';
                                }
                                if (eachDay.getFullYear() === today.getFullYear() &&
                                    eachDay.getMonth() === today.getMonth() &&
                                    eachDay.getDate() === today.getDate()) {
                                    div.style.color = 'navy';
                                    div.style.fontWeight = 'bolder';
                                    div.style.textDecoration = 'underline';
                                }
                            }
                        }
                    }
                }

                const saveButton = document.getElementById('saveButton');
                saveButton.addEventListener('click', saveSchedule);

                function saveSchedule() {
                    const popup = document.getElementById('popupWrapper');
                    popup.style.display = 'none';

                    const startDate = document.getElementById('startDate').value;
                    const endDate = document.getElementById('endDate').value;
                    const getStartTime = new Date(startDate);
                    const getEndTime = new Date(endDate);
                    const defTime = getEndTime.getTime() - getStartTime.getTime();
                    const defDate = (defTime / (1000 * 3600 * 24)) + 1;
                    const colorRange = document.getElementById('colorRange');
                    const textInput = document.getElementById('textInput').value;
                    let div1 = document.getElementById(`div${i}${j}1`);
                    let div2 = document.getElementById(`div${i}${j}2`);
                    let div3 = document.getElementById(`div${i}${j}3`);
                    const countFirstWeek = defDate <= (7 - getStartTime.getDay()) ? defDate : (7 - getStartTime.getDay());

                    let countWeeks = Math.floor((defDate - countFirstWeek) / 7);
                    const lastDays = (defDate-countFirstWeek)%7;

                    if (startDate === td.name && textInput && !div1.innerText) {
                        div1.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                        div1.innerText = textInput;
                        div1.style.width = `${41 * countFirstWeek}px`;

                        for (let w = 1; w <= countWeeks; w++) {
                            div1 = document.getElementById(`div${i + w}01`);
                            div1.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                            div1.style.width = `${41 * 7}px`;
                        }
                        if (lastDays > 0) {
                            div1 = document.getElementById(`div${i + countWeeks + 1}01`);
                            div1.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                            div1.style.width = `${41 * lastDays}px`;
                        }

                    } else if (startDate === td.name && textInput && !div2.innerText) {
                        div2.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                        div2.innerText = textInput;
                        div2.style.width = `${41 * countFirstWeek}px`;

                        for (let w = 1; w <= countWeeks; w++) {
                            div2 = document.getElementById(`div${i + w}01`);
                            div2.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                            div2.style.width = `${41 * 7}px`;
                        }
                        if (lastDays > 0) {
                            div2 = document.getElementById(`div${i + countWeeks + 1}01`);
                            div2.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                            div2.style.width = `${41 * lastDays}px`;
                        }
                    } else if (startDate === td.name && textInput && !div3.innerText) {
                        div3.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                        div3.innerText = textInput;
                        div3.style.width = `${41 * countFirstWeek}px`;

                        for (let w = 1; w <= countWeeks; w++) {
                            div3 = document.getElementById(`div${i + w}01`);
                            div3.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                            div3.style.width = `${41 * 7}px`;
                        }
                        if (lastDays > 0) {
                            div3 = document.getElementById(`div${i + countWeeks + 1}01`);
                            div3.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                            div3.style.width = `${41 * lastDays}px`;
                        }
                    }



















                    /*if (startDate === td.name && textInput && !div1.innerText) {
                        div1 = document.getElementById(`div${i+countWeeks}${j}1`);
                        div1.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                        div1.innerText = textInput;
                        div1.style.width = `${41 * inThisWeek}px`;
                    }*/







                    /*  
                      const nextLineDiv1 = document.getElementById(`div${i + 1}${j}1`);
                      const nextLineDiv2 = document.getElementById(`div${i + 1}${j}2`);
                      const nextLineDiv3 = document.getElementById(`div${i + 1}${j}3`);
  
                      if (startDate === td.name && textInput && !div1.innerText) {
                          div1.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                          div1.innerText = textInput;
                          div1.style.width = `${41 * thisWeek}px`;
                          if (nextWeek > 0) {
                              nextLineDiv1.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                              nextLineDiv1.style.width = `${41 * nextWeek}px`;
                          }
                      } else if (startDate === td.name && textInput && !div2.innerText) {
                          div2.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                          div2.innerText = textInput;
                          div2.style.width = `${41 * thisWeek}px`;
                          if (nextWeek > 0) {
                              nextLineDiv2.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                              nextLineDiv2.style.width = `${41 * nextWeek}px`;
                          }
                      } else if (startDate === td.name && textInput && !div3.innerText) {
                          div3.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                          div3.innerText = textInput;
                          div3.style.width = `${41 * thisWeek}px`;
                          if (nextWeek > 0) {
                              nextLineDiv3.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
                              nextLineDiv3.style.width = `${41 * nextWeek}px`;
                          }
                      }*/
                }

                td.addEventListener('click', viewPopup);

                function viewPopup() {
                    const popup = document.getElementById('popupWrapper');
                    popup.style.display = 'block';

                    const startDate = document.getElementById('startDate');
                    const endDate = document.getElementById('endDate');
                    startDate.value = td.name;
                    endDate.value = td.name;
                    let textInput = document.getElementById('textInput');
                    textInput.value = "";
                    const colorRange = document.getElementById('colorRange');
                    colorRange.value = 0;
                    const colorPreview = document.getElementById('colorPreview');
                    colorPreview.style.backgroundColor = `hsl(0,50%, 80%)`;
                }
                h++;
            }
        }
    }

    function addPopupWrapper(parent) {
        const popupWrapper = document.createElement('div');
        popupWrapper.id = 'popupWrapper';
        parent.appendChild(popupWrapper);

        colorWrapper(popupWrapper);
        dateWrapper(popupWrapper);
        popInput(popupWrapper);
        saveButtonWrapper(popupWrapper)

    }

    function colorWrapper(parent) {
        const colorWrapper = document.createElement('div');
        colorWrapper.id = 'colorWrapper';
        parent.appendChild(colorWrapper);

        colorRange(colorWrapper);
        colorPreview(colorWrapper);
        addCloseButton(colorWrapper);
    }

    function addCloseButton(parent) {
        const closeButton = document.createElement('button');
        closeButton.id = 'closeButton';
        closeButton.innerText = 'X';
        parent.appendChild(closeButton);

        closeButton.addEventListener('click', close)

        function close() {
            const popup = document.getElementById('popupWrapper');
            popup.style.display = 'none';
        }
    }

    function colorRange(parent) {
        const colorRange = document.createElement('input');
        colorRange.type = 'range';
        colorRange.min = '0';
        colorRange.max = '359';
        colorRange.id = 'colorRange';
        colorRange.value = '0';
        parent.appendChild(colorRange);

        colorRange.addEventListener('change', changeColor)

        function changeColor() {
            const preview = document.getElementById('colorPreview');
            preview.style.backgroundColor = `hsl(${colorRange.value},50%, 80%)`;
        }
    }

    function colorPreview(parent) {
        const colorPreview = document.createElement('div');
        colorPreview.id = 'colorPreview';
        parent.appendChild(colorPreview);
    }

    function dateWrapper(parent) {
        const dateWrapper = document.createElement('div');
        dateWrapper.id = 'dateWrapper';
        parent.appendChild(dateWrapper);

        popStartDate(dateWrapper);
        popEndDate(dateWrapper);
    }

    function popStartDate(parent) {
        const startDate = document.createElement('input');
        startDate.type = 'date';
        startDate.id = 'startDate';
        parent.appendChild(startDate);
    }

    function popEndDate(parent) {
        const endDate = document.createElement('input');
        endDate.type = 'date';
        endDate.id = 'endDate';
        parent.appendChild(endDate);
    }

    function popInput(parent) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'textInput';
        parent.appendChild(input);
    }

    function saveButtonWrapper(parent) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.id = 'buttonWrapper';
        parent.appendChild(buttonWrapper);

        saveButton(buttonWrapper)
    }

    function saveButton(parent) {
        const saveButton = document.createElement('button');
        saveButton.id = 'saveButton';
        saveButton.innerText = 'Save';
        parent.appendChild(saveButton);
    }
}