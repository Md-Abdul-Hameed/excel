const addbtn = document.querySelector(".add-sheet_btn-container");
const sheetlist = document.querySelector(".sheet-list");
let sheetno = 1;

//Adding sheets
addbtn.addEventListener("click",function(){
    const sheets = document.querySelectorAll(".sheet");
    sheetno++;
    const elem = document.createElement("div");
    elem.className = "sheet";
    elem.textContent = "Sheet "+sheetno;
    elem.setAttribute("idx",sheetno);
    sheets.forEach(function(sheet){
        sheet.classList.remove("active");
    })
    sheetlist.appendChild(elem);
    elem.classList.add("active");
})

// making sheets active on click
sheetlist.addEventListener("click",function(e){
    const sheets = document.querySelectorAll(".sheet");
    if(e.target.className=="sheet"){
        sheets.forEach(function(sheet){
            sheet.classList.remove("active");          
        })
        e.target.classList.add("active");
    }
})