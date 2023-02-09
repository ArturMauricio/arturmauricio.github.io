var info = document.getElementById('info');
var img = document.querySelector('img');
var selecao = document.getElementById('selecao');

var inicio;

function arrastador(e) {
    e.preventDefault();
    selecao.style.width = e.pageX - inicio.x + 'px';
    selecao.style.height = e.pageY - inicio.y + 'px';
	gerarInfo();
}

function gerarInfo() {
    var pos = selecao.getBoundingClientRect();
    var coords = {
        X: [pos.left,pos.right],
        Y: [pos.top, pos.bottom]
    };
    info.innerHTML = JSON.stringify(coords);
}
img.addEventListener('mousedown', function(e) {
    inicio = {
        x: e.pageX,
        y: e.pageY
    };
    selecao.style.display = 'block';
    selecao.style.left = inicio.x + 'px';
    selecao.style.top = inicio.y + 'px';
    selecao.style.width = 0;
    selecao.style.height = 0;
    window.addEventListener('mousemove', arrastador);
});
window.addEventListener('mouseup', function(e) {
    inicio = null;
    window.removeEventListener('mousemove', arrastador);
    gerarInfo();
});



function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
        };       
        file.readAsDataURL(this.files[0]);
    }
}
document.getElementById("img-input").addEventListener("change", readImage, false);