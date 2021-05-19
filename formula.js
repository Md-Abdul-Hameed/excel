const formulabar = document.querySelector(".formula-input");
const allcells = document.querySelectorAll(".grid .cbox");

for(let i = 0; i < allcells.length; i++){
    allcells[i].addEventListener("blur",function(){
        let idx = addressbar.value;
        let cell = document.querySelector(`.cbox[adrs=${idx}]`);
        let obj = getindices(idx);
        let data = allcells[i].innerText;
        sheetDB[obj.i][obj.j].value = data;
    })
}

formulabar.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulabar.value){
        let cFormula = formulabar.value;
        let value = evaluateFormula(cFormula);
        setcell(value,cFormula);
    }
})

function evaluateFormula(formula){
    let formulatoken = formula.split(" ");
    for(let i = 0; i < formulatoken.length; i++){
        let ascii = formulatoken[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            let obj = getindices(formulatoken[i]);
            let value = sheetDB[obj.i][obj.j].value || 0;
            formulatoken[i] = value;
        }
    }
    let evalutedformula = formulatoken.join(" ");
    return eval(evalutedformula);
}

function setcell(value,formula){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.innerText = value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].value = value;
    sheetDB[obj.i][obj.j].formula = formula;
}