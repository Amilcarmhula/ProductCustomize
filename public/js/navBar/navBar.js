function myMenuFunction() {
    var i = document.getElementById('navMenu')

    if (i.className === 'nav-menu') {
        i.className += ' responsive'
    } else {
        i.className = 'nav-menu'
    }
}

var a = document.getElementById('btn-login')
var b = document.getElementById('btn-register')
var xx = document.getElementById('login')
var yy = document.getElementById('register')



function login() {
    xx.style.left = '4px'
    yy.style.right = '-500px'
    a.className += ' btn-white'
    b.className = ' btn'
    xx.style.opacity = 1
    yy.style.opacity = 0
}
function register() {
    xx.style.left = '-500px'
    yy.style.right = '4px'
    a.className = 'btn'
    b.className += ' btn-white'
    xx.style.opacity = 0
    yy.style.opacity = 1
}