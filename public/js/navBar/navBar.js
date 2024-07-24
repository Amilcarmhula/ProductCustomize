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
var x = document.getElementById('login')
var y = document.getElementById('register')



function login() {
    x.style.left = '4px'
    y.style.right = '-500px'
    a.className += ' btn-white'
    b.className = ' btn'
    x.style.opacity = 1
    y.style.opacity = 0
}
function register() {
    x.style.left = '-500px'
    y.style.right = '4px'
    a.className = 'btn'
    b.className += ' btn-white'
    x.style.opacity = 0
    y.style.opacity = 1
}