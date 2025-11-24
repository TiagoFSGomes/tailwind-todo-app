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

    //Armezar em um array informações coletadas em um objeto
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
Função armazenar dados localmente dentro de uma array
*/
function addToLocalStorage(Obj) {

    const data = getFromLocalStorage();

    localStorage.setItem('tarefas', JSON.stringify([Obj]));
}
/*
Função responsável por resgatar e decodificar os dados da tarefa que foram salvos na memória local do navegador
*/
function getFromLocalStorage() {
    const checkLocalStorage = JSON.parse(localStorage.getItem('tarefas'));

    if ()//Continuar...

        return data;
}
//getFromLocalStorage(); APAGAR

/*
Função para renderizar os cards
*/
function buildCards() {
    const renderArea = document.getElementById('render-area');
    const data = getFromLocalStorage();

    const div = document.createElement('div');
    div.classList = 'h-56 bg-[#6d28d9] rounded-md p-6 hover:opacity-80';

    div.innerHTML = `
                           <p class="font-bold text-white text-xl">${data[0].atividade}</p>
                <div class="flex flex-col justify-between h-[90%]">
                    <p class="text-xs text-[#94A3B8]">${data[0].descricao}</p>
                    <div>
                        <div class="flex  items-center gap-2  text-white text-base">
                            <i class="fa-regular fa-calendar-days"></i>
                            <p>${data[0].prazo}</p>
                        </div>
                        <div class="w-full border-b border-dashed border-[#94A3B8] mt-4"></div>

                        <div class="flex justify-between items-center mt-4">
                            <div class="py-1 px-4 bg-white rounded-md hover:bg-[#6d28d9] border border-[#6d28d9]
                                 hover:border-white hover:text-white cursor-pointer text-[#6d28d9]">
                                Finalizada</div>
                            <div>
                                <i class="fa-solid fa-trash-can text-red-300 cursor-pointer"></i>
                                <i class="fa-solid fa-pen-to-square text-green-300 cursor-pointer pl-2"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    renderArea.appendChild(div);
}

buildCards();