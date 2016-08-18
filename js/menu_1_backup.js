"use strict";
(function () {
	
	var menuItens = document.querySelectorAll(".menu-itens li a");

	menuItens.forEach(function (ativa) {

		ativa.addEventListener("click",function () {
			menuItens.forEach(function (ativa) {
				ativa.classList.remove("active");
			});
			this.classList.toggle("active");
		});
	});
})();