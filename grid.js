const leftcol = document.querySelector(".leftcol");
const toprow = document.querySelector(".toprow");
const grid = document.querySelector(".grid");
const addressbar = document.querySelector(".address-input");
const bold = document.querySelector(".fa-bold");
const italic = document.querySelector(".fas.fa-italic");
const underline = document.querySelector(".fas.fa-underline");
const align = document.querySelector(".text-alignment");
const fontsize = document.querySelector(".font-size");
const fontfamily = document.querySelector(".font-family");
const textcolor = document.querySelector(".text-color");
const backgroundcolor = document.querySelector(".bg-color");

//*************      *** Making Grid ************************* */
let rows = 100;
let cols = 65;  

for(let i = 0; i < rows; i++){
    let box = document.createElement("div");
    box.innerText = i+1;
    box.setAttribute("class","box");
    leftcol.appendChild(box);
}

for(let i = cols; i < cols+26; i++){
    let box = document.createElement("div");
    box.innerText = String.fromCharCode(i);
    box.setAttribute("class","cbox");
    toprow.appendChild(box);
}

for(let i = 0; i < rows; i++){
    let row = document.createElement("div");
    row.setAttribute("class","row");
    for(let j = cols; j < cols+26; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cbox");
        // cell.innerText = `${String.fromCharCode(j)} ${i+1}`;
        cell.setAttribute("adrs",`${String.fromCharCode(j)}${i+1}`);
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }
    grid.appendChild(row);   
}

let sheetDB = [];

for(let i = 0; i < rows; i++){
    let row = [];
    for(let j = cols; j < cols+26; j++){
   let object = {
       bold:"normal",
       italic:"normal",
       align:"center",
       tcolor:"black",
       backgroundcolor:"white",
       underline:"none",
       fontsize:"16",
       fontfamily:"Arial",
       value:"",
       formula:"",
       children:[]
   }    
   row.push(object);
    }
    sheetDB.push(row);
      
}

grid.addEventListener("click",function(e){
    if(e.target.className == "cbox"){
        let cls = e.target;
        let atr = cls.getAttribute("adrs");
        addressbar.value = atr; 
        let obj = getindices(atr);
        let cellObject = sheetDB[obj.i][obj.j];
        if(cellObject.bold=="bold"){
            bold.classList.add("active-btn");
        }else{
            bold.classList.remove("active-btn");
        }
        if(cellObject.italic == "italic"){
            italic.classList.add("active-btn");
        }else{
            italic.classList.remove("active-btn");
        }
        if(cellObject.underline == "underline"){
            underline.classList.add("active-btn");
        }else{
            underline.classList.remove("active-btn");
        }
        const alignitems = document.querySelectorAll(".text-alignment>*");
        for(let i = 0; i < alignitems.length; i++){
            alignitems[i].classList.remove("active-btn");   
            if(alignitems[i].className === cellObject.align){
                alignitems[i].classList.add("active-btn");
            }
        }


        
        //textcolor.value = cellObject.tcolor;
        //backgroundcolor.value = cellObject.backgroundcolor;
        fontsize.value = cellObject.fontsize;
        fontfamily.value = cellObject.fontfamily;

    }
})
document.querySelector(".cbox[adrs='A1']").click();

function getindices(atr){
    let r = atr.slice(1);
    let c = atr[0].charCodeAt();
    let i = r-1;
    let j = c-65;
    return {i,j};
}

//************************ Formatting *********************** */
let boldclick = false;
bold.addEventListener("click",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    let obj = getindices(idx);
    if(boldclick){
        cell.style.fontWeight = "normal";
        bold.classList.remove("active-btn");
        sheetDB[obj.i][obj.j].bold = "normal";
    }else{
        cell.style.fontWeight = "bold";
        bold.classList.add("active-btn");
        sheetDB[obj.i][obj.j].bold = "bold";
    }
    boldclick = !boldclick;
})

let italicclick = false;
italic.addEventListener("click",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    let obj = getindices(idx);
    if(italicclick){
        cell.style.fontStyle = "normal";
        italic.classList.remove("active-btn");
        sheetDB[obj.i][obj.j].italic = "normal";
    }else{
        cell.style.fontStyle = "italic";
        italic.classList.add("active-btn");
        sheetDB[obj.i][obj.j].italic = "italic";
    }
    italicclick = !italicclick;
})

let underlineclick = false;
underline.addEventListener("click",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    let obj = getindices(idx);
    if(underlineclick){
        cell.style.textDecoration = "none";
        underline.classList.remove("active-btn");
        sheetDB[obj.i][obj.j].underline = "none";
    }else{
        cell.style.textDecoration = "underline"
        underline.classList.add("active-btn");
        sheetDB[obj.i][obj.j].underline = "underline";
    }
    underlineclick = !underlineclick;
})

align.addEventListener("click",function(e){
    const alignitems = document.querySelectorAll(".text-alignment>*");
    for(let i = 0; i < alignitems.length; i++){
        alignitems[i].classList.remove("active-btn");
        console.log("removed");
    }
    e.target.parentElement.classList.add("active-btn");
    let value = e.target.classList[2];
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.textAlign = value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].align = value;
})

fontsize.addEventListener("change",function(){
    console.log("Hameed");
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.fontSize = fontsize.value +"px";
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].fontsize = fontsize.value;
})

fontfamily.addEventListener("change",function(){
    console.log("fontfamily")
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.fontFamily = fontfamily.value ;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].fontfamily = fontfamily.value;
})

textcolor.addEventListener("change",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.color = textcolor.value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].tcolor = textcolor.value;
})

backgroundcolor.addEventListener("change",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.backgroundColor = backgroundcolor.value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].backgroundcolor = backgroundcolor.value;
})