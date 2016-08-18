"use strict";
(function () {
	
	var menuItens = document.querySelectorAll(".menu-itens li a");

	menuItens.forEach(function (el) {

		el.addEventListener("click",function () {
			menuItens.forEach(function (el) {
				el.classList.remove("active");
			});
			this.classList.toggle("active");
		});
	});
})();