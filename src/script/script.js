console.log('devcode');

/*
Função abrir pop-up nova tarefa
*/
function abrirModal() {
    const abrirModal = document.getElementById('nova-tarefa');

    if (abrirModal.classList.contains('hidden')) {
        abrirModal.classList.remove('hidden');
        abrirModal.classList.add('flex');
    }
}
/*
Função fechar pop-up nova tarefa
*/
function fecharModal() {
    const abrirModal = document.getElementById('nova-tarefa');

    if (abrirModal.classList.contains('flex')) {
        abrirModal.classList.remove('flex');
        abrirModal.classList.add('hidden');
    }
}
/*
Função pegar informações de formulário
*/
function getInfoByAddForm() {
    const inputAtividade = document.getElementById('add-atividade').value;
    const inputDescricao = document.getElementById('add-descricao').value;
    const inputPrazo = document.getElementById('add-prazo').value;
    const inputImportante = document.getElementById('add-importante').checked;

    //Armezar informações coletadas em um objeto
    const inputObj = {
        atividade: inputAtividade,
        descricao: inputDescricao,
        prazo: inputPrazo,
        importante: inputImportante

    };

    console.log(inputObj);
    addToLocalStorage(inputObj);
    fecharModal();

}

/*
Função armazenar dados localmente
*/
function addToLocalStorage(Obj) {
    localStorage.setItem('tarefas', JSON.stringify(Obj));
}
/*
Função responsável por resgatar e decodificar os dados da tarefa que foram salvos na memória local do navegador
*/
function getFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('tarefas'));
    console.log(data);
    return data;
}
getFromLocalStorage();