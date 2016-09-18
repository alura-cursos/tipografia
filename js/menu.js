"use strict";
(function () {

	var menu = document.querySelector(".navbar");
	var banner = document.querySelector("#introducao");
	var footer = document.querySelector("footer");

	var btnSairMenu = document.querySelector("#btn-sair-menu");
	var btnMenu = document.querySelector("#btn-menu");

	btnMenu.addEventListener("click", function(e){
		e.preventDefault();
		menu.classList.add("navbar--active");
	});

	btnSairMenu.addEventListener("click",function (e) {
		e.preventDefault();
		menu.classList.remove("navbar--active");
	});

	document.addEventListener("click", function(e){
		if(!e.target.classList.contains('btn-menu')){
			menu.classList.remove("navbar--active");
		}
	});

	var nodeList = Array.prototype.slice.call(document.querySelectorAll(".menu-itens li a"));
	var menuItens = [];
	var sections = Array.prototype.slice.call(document.querySelectorAll("section"));

	nodeList.forEach(function (node) {
		menuItens[node.getAttribute("href").substr(1)] = node;
	});

	for(var prop in menuItens) {
		var node = menuItens[prop];

		node.addEventListener("click",function () {

			desmarcaTodos();

			this.classList.toggle("active");

		});
	}

	window.onscroll = function () {

		sections.forEach(function (el) {

			var idAtual = el.getAttribute('id');
			var tamanhoAtual = -el.offsetHeight;
			var relativePos = pegaPosicaoDo(el) - (introducao.offsetHeight + menu.offsetHeight - footer.offsetHeight);

			if(relativePos <= 0 && relativePos > tamanhoAtual) {
				menuItens[idAtual].classList.add("active");
			}else {
				menuItens[idAtual].classList.remove("active");
			}

		});
	}


	function pegaPosicaoDo(elemento) {
		return elemento.getBoundingClientRect().top;
	}
	function desmarcaTodos(itens) {
		for(var prop in itens) {
			itens[prop].classList.remove("active");
		}
	}
})();
