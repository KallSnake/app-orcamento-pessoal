// alert("Bem Vindo!!");




class Despesa {

	constructor(ano, mes, dia, tipo, descricao, valor) {

	this.ano = ano
	this.mes = mes
	this.dia = dia
	this.tipo = tipo
	this.descricao = descricao
	this.valor = valor

	}



	validarDados() {

		for ( let i in this ) {

			if ( this[i] == undefined || this[i] == '' || this[i] == null ) {

				return false;

			}

		}


		return true;


	}



}




class Bd {


	constructor() {

		let id = localStorage.getItem("id");


		if ( id === null ) {

			localStorage.setItem("id", 0)
		}

	}



	getProximoId() {

		let proximoId = localStorage.getItem("id"); // null - pois não no Local Storage que possua um id então o retorno é null

		return parseInt(proximoId) + 1;
	}



	gravar(d) {

		let id = this.getProximoId();

		localStorage.setItem(id, JSON.stringify(d));

		localStorage.setItem("id", id);

	}



	recuperarTodosRegistros() {

		// alert("Registros recuperados com sucesso!");


		// array de despesas
		let despesas = Array();



		let id = localStorage.getItem("id");


		// recuperando todas as despesas cadastradas em Local Storage
		for (let i = 1; i <= id; i++) {
			

			// recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i));

			// console.log(i, despesa);


			// verificando se existe a possibilidade de haver índices que pulados/removidos

			if ( despesa === null ) {

				continue;

			} 


			despesa.id = i;
			despesas.push(despesa);


		}

		// console.log(despesas);

		return despesas;


	}



	pesquisar(despesa) {

		// console.log(despesa);

		let despesasFiltradas = Array();

		despesasFiltradas = this.recuperarTodosRegistros();


		
		// console.log(despesa);

		// Array original/sem filtros
		// console.log(despesasFiltradas);


		// ano
		if ( despesa.ano != "" ) {

			despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano );

		}
		

		// mes
		if ( despesa.mes != "" ) {

			despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes );

		}
		

		// dia
		if ( despesa.dia != "" ) {

			despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia );

		}



		// tipo
		if ( despesa.tipo != "" ) {

			despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo );

		}



		// descrição
		if ( despesa.descricao != "" ) {

			despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao );

		}
		

		// Array com filtros
		// console.log(despesasFiltradas);


		return despesasFiltradas;




	}




	remover(id) {

		localStorage.removeItem(id);

	}





}



let bd = new Bd();




function cadastrarDespesa() {


	let ano = document.getElementById("ano");
	let mes = document.getElementById("mes");
	let dia = document.getElementById("dia");
	let tipo = document.getElementById("tipo");
	let descricao = document.getElementById("descricao");
	let valor = document.getElementById("valor");




	// alert(`${ano.value}, ${mes.value}, ${dia.value}, ${tipo.value}, ${descricao.value}, ${valor.value}`);


	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	

	if ( despesa.validarDados() ) {

		// Gravando no Local Storage
		bd.gravar(despesa);


		// inner.HTML = atribui conteúdo interno, ou seja, dentro de uma determinada tag html  
		document.getElementById("modal_titulo").innerHTML = "Registro inserido com sucesso";


		// atribuido classe ao elemento selecionado
		document.getElementById("modal_titulo_div").className = "modal-header text-success";


		// inner.HTML = atribui conteúdo interno, ou seja, dentro de uma determinada tag html 
		document.getElementById("modal_conteudo").innerHTML = "Despesa foi cadastrada com sucesso!";


		//
		document.getElementById("modal_btn").className = "btn btn-outline-success";


		//
		document.getElementById("modal_btn").innerHTML = "voltar";



		// dialogo de sucesso
		$("#modalRegistroDespesa").modal("show");

		// Limpando os campos após gravação
		ano.value = "";
		mes.value = "";
		dia.value = "";
		tipo.value = "";
		descricao.value = "";
		valor.value = "";

	} else {


		// inner.HTML = atribui conteúdo interno, ou seja, dentro de uma determinada tag html 
		document.getElementById("modal_titulo").innerHTML = "Erro na inclusão do registro";


		// atribuido classe ao elemento selecionado
		document.getElementById("modal_titulo_div").className = "modal-header text-danger";


		// inner.HTML = atribui conteúdo interno, ou seja, dentro de uma determinada tag html 
		document.getElementById("modal_conteudo").innerHTML = "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!";


		//
		document.getElementById("modal_btn").className = "btn btn-outline-danger";


		//
		document.getElementById("modal_btn").innerHTML = "voltar e corrigir";



		// dialogo de erro
		$("#modalRegistroDespesa").modal("show");

	}

	

}



/*
function gravar(d) {


	localStorage.setItem("despesa", JSON.stringify(d))

}
*/



function carregaListaDespesas(despesas = Array(), filtro = false) {


	if ( despesas.length == 0 && filtro == false ) {
	
	despesas = bd.recuperarTodosRegistros();

	// console.log(despesas);

} 



    // Selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById("listaDespesas");

	listaDespesas.innerHTML = "";

	/*

	 <tr>
                  
     0 = <td> 15/03/2018 </td>

     1 = <td> Alimentação </td>

     2 = <td> Compras do mês </td>

     3 = <td> 444.75 </td>

    </tr> 

	*/


	// percorrendo o array despesas, listando cada despesa de forma dinâmica
	despesas.forEach(function(d) {

		// criando a linha (tr)
		let linha = listaDespesas.insertRow()


		// criando as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;


		// ajustando o tipo
		switch ( d.tipo ) {

			case "1": d.tipo = "Alimentação";
				break;

			case "2": d.tipo = "Educação";
				break;

			case "3": d.tipo = "Lazer";
				break;

			case "4": d.tipo = "Saúde";
				break;

			case "5": d.tipo = "Transporte";
				break;

		}


		linha.insertCell(1).innerHTML = d.tipo;
		linha.insertCell(2).innerHTML = d.descricao;
		linha.insertCell(3).innerHTML = d.valor;


		// Criando botão de exclusão
		let btn = document.createElement("button");

		// Aplicando uma classe ao btn
		btn.className = "btn btn-outline-danger";

		// Adicionando conteúdo dentro do btn
		btn.innerHTML = '<i class="fas fa-times"></i>'

		btn.id = d.id;

		// Aplicando uma ação no btn
		btn.onclick = (id) => { 

			// Removendo a despesa
			// alert("Despesa removida com sucesso!");

			alert(this.id);

			let id = this.id.replace("id","");

			bd.remover(this.id);


			// Recarregando página após remover despesa
			window.location.reload();

		}


		// Realizando o inclusão do elemento btn (button)
		linha.insertCell(4).append(btn);


		console.log(d);



	})


}




function pesquisaDespesa() {

	// alert("Pesquisar despesa");

	let ano = document.getElementById("ano").value;
	let mes = document.getElementById("mes").value;
	let dia = document.getElementById("dia").value;
	let tipo = document.getElementById("tipo").value;
	let descricao = document.getElementById("descricao").value;
	let valor = document.getElementById("valor").value;


	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);


	// console.log(despesa);


	let despesas = bd.pesquisar(despesa);


	this.carregaListaDespesas(despesas, true);




}
