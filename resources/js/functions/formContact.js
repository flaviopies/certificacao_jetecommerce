import { _alert } from "./message";
import { isValidEmail, validPhone } from "./validate";

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
		if(isValidEmail($("#formContactEmail").val())) {
			var cliente = JSON.stringify({
				Nome     : $("#formContactName").val(),
				Telefone : $("#formContactPhone").val(),
				Email    : $("#formContactEmail").val(),
				Assunto  : $("#formContactAssunto").val(),
				Mensagem : $("#formContactMsg").val()
			});
	
			listaContatos.push(cliente);
			sessionStorage.setItem("listaContatos", JSON.stringify(listaContatos));
			_alert("Salvo com sucesso");
			return true;
		}
		else {
			_alert("Se atente ao preenchimento correto do formulário - tente de novo!  - tente de novo!");
			return true;
		}

	}

	function Editar(){
		listaContatos[indice_selecionado] = JSON.stringify({
				Nome     : $("#formContactName").val(),
				Telefone : $("#formContactPhone").val(),
				Email    : $("#formContactEmail").val(),
				Assunto  : $("#formContactAssunto").val(),
				Mensagem : $("#formContactMsg").val()
			});

		if(isValidEmail($("#formContactEmail").val())) {
			var cliente = JSON.stringify({
				Nome     : $("#formContactName").val(),
				Telefone : $("#formContactPhone").val(),
				Email    : $("#formContactEmail").val(),
				Assunto  : $("#formContactAssunto").val(),
				Mensagem : $("#formContactMsg").val()
			});
	
			sessionStorage.setItem("listaContatos", JSON.stringify(listaContatos));
			_alert("Informações editadas.")
			eventoCRUD = "A";
			return true;
		}
		else {
			_alert("Se atente ao preenchimento correto do formulário - tente de novo! ");
			return true;
		}
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
				"<td><a alt='" + i + "' class='ui button red small btnExcluir' style='cursor: pointer;'><i class='trash alternate icon'></i></a></td>" + 
			"</tr>"
				);
		 }
	}

	function Excluir(){
		listaContatos.splice(indice_selecionado, 1);
		sessionStorage.setItem("listaContatos", JSON.stringify(listaContatos));
		_alert("Contato excluido");
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

