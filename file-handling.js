let content = "Hello Adarsh" ;


function DownloadButton(){


    const blob = new Blob([content], { type : "text/plain"});
    console.log(blob);
let url = URL.createObjectURL(blob);

    let anchor = document.createElement("a");
    anchor.href = "url";
    anchor.download = "temp.txt";
    anchor.innerText = "Click to Download";
    document.body.appendChild(anchor);
    
}