
$(function(){
	
	// Conforme os campos forem sendo preenchidos, os valores devem ficar visíveis
	// ao lado do formulário (Campo: Valor). (2 Pts) 
	let valoresForm = {
        onChangeInput:function(){
                let name = $(this).attr("id");
                $("." + name).html($(this).val())           
        },
	}

	var eventoCRUD = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var listaContatos = sessionStorage.getItem("listaContatos");// Recupera os dados armazenados

	listaContatos = JSON.parse(listaContatos); // Converte string para objeto

	if(listaContatos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		listaContatos = [];

	function Adicionar(){
		console.log("Função adicionar ativada");
		var cliente = JSON.stringify({
			Nome     : $("#formContactName").val(),
			Telefone : $("#formContactPhone").val(),
			Email    : $("#formContactEmail").val(),
			Assunto  : $("#formContactAssunto").val(),
			Mensagem : $("#formContactMsg").val()
		});

		listaContatos.push(cliente);
		sessionStorage.setItem("listaContatos", JSON.stringify(listaContatos));
		alert("Salvo com sucesso");
		return true;
	}

	function Editar(){
		listaContatos[indice_selecionado] = JSON.stringify({
				Nome     : $("#formContactName").val(),
				Telefone : $("#formContactPhone").val(),
				Email    : $("#formContactEmail").val(),
				Assunto  : $("#formContactAssunto").val(),
				Mensagem : $("#formContactMsg").val()
			});

			sessionStorage.setItem("listaContatos", JSON.stringify(listaContatos));
		alert("Informações editadas.")
		eventoCRUD = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<table class='ui celled table'>" + 
			"<thead>" +
				"<tr>"+
				"<th>Nome</th>"+
				"<th>E-mail</th>"+
				"<th>Telefone</th>"+
				"<th>Assunto</th>"+
				"<th>Mensagem</th>"+
				"<th>Editar</th>"+
				"<th>Excluir</th>"+
			"</tr></thead>"+
			"<tbody>"+
			"</tbody>"+
			"</table>"
			);

		 for(var i in listaContatos){
			var cli = JSON.parse(listaContatos[i]);
		  	$("#tblListar tbody").append(

			"<tr>"+
				"<td data-label='Name'>" + cli.Nome + "</td>"+
				"<td data-label='Email'>" + cli.Email + "</td>"+
				"<td data-label='Telefone'>" + cli.Telefone + "</td>"+
				"<td data-label='Assunto'>" + cli.Assunto + "</td>"+
				"<td data-label='Mensagem'>" + cli.Mensagem + "</td>"+
				"<td><a alt='" + i + "' class='ui button green small btnEditar' style='cursor: pointer;'><i class='pencil alternate icon'></i></a></td>" +
				"<td><a alt='" + i + "' class='ui button red small btnExcluir' style='cursor: pointer;'><i class='trash alternate icon'></i></a></div></td>" + 
			"</tr>"
				);
		 }
	}
	// function Listar(){
	// 	$("#tblListar").html("");
	// 	$("#tblListar").html(
	// 		"<thead>"+
	// 		"<tr>" +
	// 		"</thead>" +
	// 		"<tbody>" +
	// 		"</tbody>"
	// 		);

	// 	 for(var i in listaContatos){
	// 		var cli = JSON.parse(listaContatos[i]);
	// 	  	$("#tblListar tbody").append(
	// 			  "<div class='ui list'>"+
	// 				"<div class='item'><a alt='"+i+"' class='ui button green small btnEditar' style='cursor: pointer;'>"+
	// 				"<i class='pencil alternate icon'></i></a><a alt='" + i + "' class='ui button red small btnExcluir' style='cursor: pointer;'><i class='trash alternate icon'></i></a></div>" + 
	// 				"div class='item'><h3>"+"Nome: "+"<span>" + cli.Nome + "</span></h3> </div>"+
	// 				"div class='item'><h3>"+"Email: "+"<span>" + cli.Email + "</span></h3> </div>"+ 				
	// 				"<div class='item'><h3>"+"Telefone: "+"<span>" + cli.Telefone + "</span></h3> </div>"+
	// 				"<div class='item'><h3>"+"Assunto: "+"<span>" + cli.Assunto + "</span></h3> </div>"+
	// 				"<div class='item'><h3>"+"Mensagem: "+"<span>" + cli.Mensagem + "</span></h3></div>"+
	// 				"<p><br><hr></p> " +  
	// 				"</div>"
	// 			);
	// 	 }
	// }

	function Excluir(){
		listaContatos.splice(indice_selecionado, 1);
		sessionStorage.setItem("listaContatos", JSON.stringify(listaContatos));
		alert("Contato excluido");
	}

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in listaContatos) {
            var i = JSON.parse(listaContatos[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#formContato").on("click", ".btnSubmit",function(){
		if(eventoCRUD == "A") {
			console.log("Form contact sent");			
			return Adicionar();
		}
		else	
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		eventoCRUD = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(listaContatos[indice_selecionado]);
		
		$("#formContactName").val(cli.Nome);
		$("#formContactPhone").val(cli.Telefone);
		$("#formContactEmail").val(cli.Email);
		$("#formContactAssunto").val(cli.Assunto);
		$("#formContactMsg").val(cli.Mensagem);
		$("#formContactName").focus();
	});

	$('input, textarea').on('keypress keyup change',valoresForm.onChangeInput)

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
	
});

