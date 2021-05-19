const formulabar = document.querySelector(".formula-input");
const allcells = document.querySelectorAll(".grid .cbox");

for(let i = 0; i < allcells.length; i++){
    allcells[i].addEventListener("blur",function(){
        // let idx = addressbar.value;
        // let cell = document.querySelector(`.cbox[adrs=${idx}]`);
        let idx = allcells[i].getAttribute("adrs");
        let obj = getindices(idx);
        let data = allcells[i].innerText;
        sheetDB[obj.i][obj.j].value = data;
        updateChildren(sheetDB[obj.i][obj.j]);
    })
}

formulabar.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulabar.value){
        let cFormula = formulabar.value;
        let value = evaluateFormula(cFormula);
        let address = addressbar.value;
        setcell(value,cFormula,address);
        setParenttoChildren(cFormula,address);
    }
})

//Replace cell value and return evaluated result
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

//Set cell value and its formula in sheetdb as well as UI
function setcell(value,formula,idx){
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.innerText = value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].value = value;
    sheetDB[obj.i][obj.j].formula = formula;
}

//register yourself as children of the parent(cells that are present in the formula)
function setParenttoChildren(formula,childrenAddress){
    let formulatoken = formula.split(" ");
    for(let i = 0; i < formulatoken.length; i++){
        let ascii = formulatoken[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            let obj = getindices(formulatoken[i]);
            let parentobj = sheetDB[obj.i][obj.j];
            parentobj.children.push(childrenAddress);
        }
    }
}

function updateChildren(cell){
    let children = cell.children;
    if(children==undefined){
        return;
    }
    for(let i = 0; i < children.length; i++){
        let idx = children[i];
        let obj = getindices(idx);
        let chformula = sheetDB[obj.i][obj.j].formula;
        console.log(chformula);
        let newvalue = evaluateFormula(chformula);
        setcell(newvalue,chformula,idx);
        console.log(newvalue);     
        updateChildren(sheetDB[obj.i][obj.j]);  
    }
}
