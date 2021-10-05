function list_board_js(list_board_html) {
    window.open(list_board_html.value);
}

function create_board_js(create_board_html) {
    window.open(create_board_html.value);
}

var hw = document.getElementById('hw');
hw.addEventListener('click', function(){
    alert('Hello world');
})