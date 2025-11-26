//Variável global para rastrear o índice da tarefa em edição. Se for -1, é adição.
let currentEditIndex = -1;


/*
Função abrir pop-up nova tarefa (Ajustada para Adição/Edição)
*/
function abrirModal(index = -1) {
    const abrirModalElement = document.getElementById('nova-tarefa');

    // Armazena o índice na variável global
    currentEditIndex = index;

    // Elementos do modal para edição (necessário no HTML para mudar o texto)
    const modalTitle = abrirModalElement.querySelector('.text-xl.font-bold.text-white') || { textContent: 'Adicionar tarefa' };
    const modalButton = abrirModalElement.querySelector('button[onclick="getInfoByAddForm()"]') || { textContent: 'AdicionarTarefa' };


    // Limpa campos input ao executar a função
    document.getElementById('add-atividade').value = '';
    document.getElementById('add-descricao').value = '';
    document.getElementById('add-prazo').value = '';
    document.getElementById('add-importante').checked = false;


    // Lógica para Edição
    if (index !== -1) {
        const data = getFromLocalStorage();
        const tarefa = data[index];

        document.getElementById('add-atividade').value = tarefa.atividade;
        document.getElementById('add-descricao').value = tarefa.descricao;
        document.getElementById('add-prazo').value = tarefa.prazo;
        document.getElementById('add-importante').checked = tarefa.importante;

        // Altera texto do card para Edição
        modalTitle.textContent = 'Editar tarefa';
        modalButton.textContent = 'Salvar Alterações';
    } else {
        // Restaura texto para Adição
        modalTitle.textContent = 'Adicionar tarefa';
        modalButton.textContent = 'Adicionar Tarefa';
    }


    if (abrirModalElement.classList.contains('hidden')) {
        abrirModalElement.classList.remove('hidden');
        abrirModalElement.classList.add('flex');
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
    currentEditIndex = -1; // Reseta o estado de edição
}
/*
Função deletar atividade (Renomeada/Corrigida)
*/
function detetarAtividade(index) {
    const data = getFromLocalStorage();
    data.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(data));
    buildCards();
}
/*
Função Editar atividade (Não será mais chamada diretamente do card)
*/
function editarAtividade(index, inputObj) {
    const data = getFromLocalStorage();
    data[index] = inputObj;
    localStorage.setItem('tarefas', JSON.stringify(data));
}

/*
Função pegar informações de formulário (Ajustada para lidar com Adição ou Edição)
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

    //Lógica de controle Adicionar/Editar
    if (currentEditIndex !== -1) {
        // Modo Edição: Salva as alterações na tarefa existente
        editarAtividade(currentEditIndex, inputObj);
    } else {
        // Modo Adição: Adiciona uma nova tarefa
        addToLocalStorage(inputObj);
    }

    fecharModal();
    buildCards();


}

/*
Função armazenar dados localmente
*/
function addToLocalStorage(Obj) {

    const data = getFromLocalStorage();

    data.push(Obj);

    localStorage.setItem('tarefas', JSON.stringify(data));
}
/*
Função responsável por resgatar e decodificar os dados da tarefa que foram salvos na memória local do navegador
*/
function getFromLocalStorage() {
    const checkLocalStorage = JSON.parse(localStorage.getItem('tarefas'));

    if (checkLocalStorage !== null) {
        const data = JSON.parse(localStorage.getItem('tarefas'));
        return data;
    } else {
        return [];
    }
}
/*
Função para renderizar os cards
*/
function buildCards() {
    const renderArea = document.getElementById('render-area');
    const data = getFromLocalStorage();
    renderArea.innerHTML = '';

    if (data.length === 0) {
        const div = document.createElement('div');
        div.classList = `
            h-56 
            flex 
            justify-center 
            items-center 
            border 
            border-dashed 
            border-[#94A3B8] 
            rounded-md 
            p-6 
            hover:opacity-80 
            hover:bg-[#141E33] 
            text-[#94A3B8] 
            cursor-pointer
        `;
        div.innerText = 'Adicionar atividade';

        div.onclick = () => abrirModal();

        renderArea.appendChild(div);
        return;
    }


    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        div.classList = `
            h-56
            bg-[#6d28d9]
            rounded-md
            p-6
            hover:opacity-80`;

        div.innerHTML = `
                           <p class="font-bold text-white text-xl">${data[i].atividade}</p>
                <div class="flex flex-col justify-between h-[90%]">
                    <p class="text-xs text-[#94A3B8]">${data[i].descricao}</p>
                    <div>
                        <div class="flex items-center gap-2 text-white text-base">
                            <i class="fa-regular fa-calendar-days"></i>
                            <p>${data[i].prazo}</p>
                        </div>
                        <div class="w-full border-b border-dashed border-[#94A3B8] mt-4"></div>

                        <div class="flex justify-between items-center mt-4">
                            <div class="py-1 px-4 bg-white rounded-md hover:bg-[#6d28d9] border border-[#6d28d9]
                                hover:border-white hover:text-white cursor-pointer text-[#6d28d9]">
                                Finalizada</div>
                            <div>
                                <i class="fa-solid fa-trash-can text-red-300 cursor-pointer" onclick="detetarAtividade(${i})"></i>
                                <i class="fa-solid fa-pen-to-square text-green-300 cursor-pointer pl-2" onclick="abrirModal(${i})"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderArea.appendChild(div);
    }

}

buildCards();