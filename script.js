async function carregarArtigos() {
    const resposta = await fetch('artigos.json');
    const artigos = await resposta.json();
    
    const dropdown = document.getElementById('historico');
    const principalTitulo = document.getElementById('artigo-titulo');
    const principalData = document.getElementById('artigo-data');
    const principalConteudo = document.getElementById('artigo-conteudo');

    // 1. Mostrar o mais recente (primeiro do JSON)
    const atual = artigos[0];
    principalTitulo.innerText = atual.titulo;
    principalData.innerText = atual.data;
    principalConteudo.innerText = atual.conteudo;

    // 2. Popular o dropdown com os últimos 20
    artigos.slice(0, 20).forEach((art, index) => {
        let opt = document.createElement('option');
        opt.value = index;
        opt.innerHTML = art.titulo;
        dropdown.appendChild(opt);
    });

    // Função para trocar o artigo ao clicar no dropdown
    window.carregarArtigoSelecionado = (index) => {
        if(index === "") return;
        const sel = artigos[index];
        principalTitulo.innerText = sel.titulo;
        principalData.innerText = sel.data;
        principalConteudo.innerText = sel.conteudo;
    };
}

carregarArtigos();
