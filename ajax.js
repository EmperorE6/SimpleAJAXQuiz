let ajaxreq;
let ajaxCallback;


function ajaxRequest(url) {
    ajaxreq = new XMLHttpRequest();
    ajaxreq.open('GET', "questions.xml", true);
    ajaxreq.onreadystatechange = function () {
        if (ajaxreq.readyState === 4) {
            if (ajaxreq.status === 200) {
                ajaxCallback();
            } else {
                console.error("Error loading the XML file");
            }
        }
    };
    ajaxreq.send();
}