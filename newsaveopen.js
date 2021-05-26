let save = document.querySelector(".Save");
let open = document.querySelector(".Open");
// functionality -> download excel representation
save.addEventListener("click", function () {
    console.log("hameed");
    //2d arrayy save file 
    const data = JSON.stringify(sheetDB);
    // convert it into blob
    // data -> file like object convert
    const blob = new Blob([data], { type: 'application/json' });
    // convert it any type file into url
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    // content in that file
    a.href = url;
    // file download
    a.download = "file.json";
    // anchor click
    a.click();
})
// downloaded file -> open read 
// input type file -> change event file name
open.addEventListener("click", function () {
    // files array -> file accept-> multiple files get 
    let filesArray = open.files;

    let fileObj = filesArray[0];
    // file reader to read the file
    let fr = new FileReader();
    // read as text 
    fr.readAsText(fileObj);
    fr.onload = function () {
        // 3 darray
        console.log(fr.result);
        // sheet array 
        let sheetArray = fr.result;
        sheetDB = sheetArray[0];
        // first sheet db get 
        // setUi call
    }
    fr.addEventListener("load", function () {
        console.log(fr.result);

    })

    // ui init f
})
