$.ajax({
    url: '../js/data.json',
    success: result => {
        const datas = result;
        let tables = '';
        datas.forEach((data) => {
            tables += showTable(data);
        });
        $('.table-body').html(tables);

        // Search Input section
        $('#searchbtn').on('keyup', function() {
            const value = $(this).val();
            const textLabel = document.querySelector('#inputlabel').textContent.toLowerCase();
            const data = SearchInput(value, datas, textLabel);
            showTableFiltered(data);
        })

        // Export file Excel section
        $('#exportexcel').on('click', function() {
            $('#mainTable').excelexportjs({
                containerid: 'mainTable',
                datatype: 'table'
            })
        });

        // Export file PDF section
        ExportFilePDF()
        

        $('#SortSearch').on('change', function() {
            const value = $(this).val();
            ChangeSearchFilter(value);
        })
    }

})

function ChangeSearchFilter(value) {
    let SearchLabel = document.querySelector('#inputlabel');
    SearchLabel.innerHTML = '';

    const searchInput = document.querySelector('.searchInput');

    if(value == 'Name') {
        let text = 'Search by Name';
        SearchLabel.innerHTML += text;
        searchInput.style.display = 'block';
    }else if(value == 'Club') {
        let text = 'Search by Club';
        SearchLabel.innerHTML += text;
        searchInput.style.display = 'block';
    }else if(value == 'Grade') {
        let text = 'Search by Grade';
        SearchLabel.innerHTML += text;
        searchInput.style.display = 'block';
    }
}

function ExportFilePDF() {
    const exportPDF = document.querySelector('#exportPDF');
        exportPDF.addEventListener('click', function() {
            const doc = new jsPDF();
            
            doc.autoTable({
                html: '#mainTable',
                startY: 10,
                theme: 'striped',
                headStyles: {textColor: [255,255,255], fillColor: [0,0,0]}
            });
            doc.save('Table details.pdf');
        })
}


function SearchInput(value, data, sort) {
    const filteredData = [];

    for(let i = 0; i < data.length; i++) {
        value = value.toLowerCase();
        const name = data[i].name.toLowerCase();
        const club = data[i].club.toLowerCase();
        const grade = data[i].grade.toLowerCase();

        const sortName = sort.includes('name');
        const sortClub = sort.includes('club');
        const sortGrade = sort.includes('grade');

        if(sortName) {
            if(name.includes(value)) {
                filteredData.push(data[i]);
                // console.log(name);
            }
        }

        if(sortClub) {
            if(club.includes(value)) {
                filteredData.push(data[i]);
            }
        }
        
        if(sortGrade) {
            if(grade.includes(value)) {
                filteredData.push(data[i]);
            }
        }

    }

    return filteredData;
}


function showTableFiltered(t) {
    let table = document.querySelector('tbody');
    table.innerHTML = '';

    for(let i = 0; i < t.length; i++) {
        let row =   `<tr>
                        <td>${t[i].id}</td>
                        <td>${t[i].name}</td>
                        <td>${t[i].club}</td>
                        <td>${t[i].grade}</td>
                    </tr>`;
            table.innerHTML += row;
        }
        // return table;
        
}

function showTable(t) {
    return `<tr>
                <td>${t.id}</td>
                <td>${t.name}</td>
                <td>${t.club}</td>
                <td>${t.grade}</td>
            </tr>`
}