const form = document.getElementById('formTarefa');
const lista = document.getElementById('lista');

async function carregarTarefas(){
    const res = await fetch('api.php?acao=listar');
    const tarefas = await res.json();
    lista.innerHTML = '';
    tarefas.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.descricao;
        if(t.concluida) li.classList.add('concluida');

        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir';
        btnConcluir.onclick = () => concluirTarefa(t.id);

        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Deletar';
        btnDeletar.onclick = () => deletarTarefa(t.id);

        li.appendChild(btnConcluir);
        li.appendChild(btnDeletar);
        lista.appendChild(li);
    });
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value;
    await fetch('api.php?acao=adicionar', {
        method: 'POST',
        body: new URLSearchParams({descricao})
    });
    form.reset();
    carregarTarefas();
}

async function deletarTarefa(id){
    await fetch('api.php?acao=deletar', {
        method: 'POST',
        body: new URLSearchParams({id})
    });
    carregarTarefas();
}

async function concluirTarefa(id){
    await fetch('api.php?acao=concluir', {
        method: 'POST',
        body: new URLSearchParams({id})
    });
    carregarTarefas();
}

carregarTarefas();
