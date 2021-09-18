const exportbtn = document.querySelector('#exportbtn');

exportbtn.addEventListener('click', function() {
    const doc = new jsPDF('p', 'pt', 'letter');
    // let htmlString = '';
    // let tempVarToCheckHeight = 0;
    // let pageHeight = 0;
    
    // pageHeight = doc.internal.pageSize.height;
    // specialElementHandler = {
    //     // element with id of "bypass" - jquery style selector
    //     'bypass': (elemenet, renderer) => {
    //         // true = "handled elsewhere, bypass text extraction"
    //         return true
    //     }
    // };
    
    // margins = {
    //     top: 50,
    //     bottom: 60,
    //     left: 40,
    //     right: 40,
    //     width: 600
    // };
    
    // let y = 20;
    // doc.setLineWidth(2);
    // doc.text(200, y = y + 30, 'TOTAL MARKS OF STUDENTS');
    doc.autoTable({
        html: '#simple_table',
        startY: 20,
        theme: 'striped',
        // columnStyles max is 540
        // columnStyles: {
        //     0: {cellWidth: 25},
        //     1: {cellWidth: 50},
        //     2: {cellWidth: 50},
        //     3: {cellWidth: 135}
        // },
        // columnStyles: { 0: {fillColor: [0,0,0]}}
        headStyles: {fillColor: [0,0,0], textColor: [255,255,255]}
    });
    doc.save('Marks_of_students.pdf');
})
