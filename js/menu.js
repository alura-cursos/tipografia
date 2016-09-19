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

	var links = Array.prototype.slice.call(document.querySelectorAll(".menu-itens li a"));
	links.forEach(function(link){
		link.addEventListener("click",function () {
			desmarcaTodos(menuItens);
			this.classList.toggle("active");
		});
	});

	var menuItens =	links.reduce(function (menuItens, link) {
		menuItens[link.getAttribute("href").substr(1)] = link;
		return menuItens;
	}, {});

	var sections = Array.prototype.map.call(document.querySelectorAll("section"), function(section, index){
		return {
			element: section
			,top: function(){
				return section.getBoundingClientRect().top + window.scrollY - (menu.getBoundingClientRect().height)
			}
			,bottom: function(){
				return section.getBoundingClientRect().top + window.scrollY + section.offsetHeight - (menu.getBoundingClientRect().height)
			}
		}
	});

	window.onscroll = _debounce(function markCurrentSection(){
		var $currentSection = sections.reduce(function($currentSection, section){
			if($currentSection){
				return $currentSection
			}
			if(scrollY >= section.top() && scrollY <= section.bottom()){
				return section.element
			}
		}, null)

		desmarcaTodos(menuItens)
		if($currentSection !== null){
			menuItens[$currentSection.getAttribute('id')].classList.add("active");
		}
	}, 10)

	function desmarcaTodos(itens) {
		for(var prop in itens) {
			itens[prop].classList.remove("active");
		}
	}

	function _throttle(fn, timeinmilis){
        var intervaloSyncEdicao;
        return function(){
            clearInterval(intervaloSyncEdicao);
            intervaloSyncEdicao = setTimeout(function(){
                fn()
            }, timeinmilis);
        }
    }

	function _debounce(fn, rate){
		var counter = -1;
		var resetDebounce = function(){
			counter = 0;
			fn()
		}
		var shouldTrigger = function(){
			return (counter % rate) == 0
		}
		var triggerIfLastTime = _throttle(function(){
			resetDebounce()
		},50)
        return function(){
			counter++
			triggerIfLastTime()
			if(shouldTrigger()){
				resetDebounce()
			}
        }
    }
})();
