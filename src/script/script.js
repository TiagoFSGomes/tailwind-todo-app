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

    //Armezar informações coletadas em um objeto

    const inputObj = {
        atividade: inputAtividade,
        descricao: inputDescricao,
        prazo: inputPrazo

    };

    console.log(inputObj);
}
