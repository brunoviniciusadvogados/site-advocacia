// Link da sua planilha publicado como TSV
const urlPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRU8LfoWc3Wdz61bxNPUjYfjUULYqlDPdWbVyZNu43YpJzUzPCV0muA7XtAeMMyqpj5vRdBLVEvtb1-/pub?output=tsv";

async function carregarArtigos() {
    try {
        const resposta = await fetch(urlPlanilha);
        const textoBruto = await resposta.text();
        
        // Divide o texto por linhas e remove linhas vazias
        const linhas = textoBruto.split(/\r?\n/).filter(linha => linha.trim() !== "");
        
        // Remove a primeira linha (cabeçalho) e processa os dados
        const dados = linhas.slice(1).map(linha => {
            const colunas = linha.split('\t'); // Divide por tabulação
            return {
                id: colunas[0],
                titulo: colunas[1],
                data: colunas[2],
                conteudo: colunas[3]
            };
        });

        // Inverte a ordem para que o último artigo escrito na planilha seja o primeiro do site
        const artigos = dados.reverse();

        const dropdown = document.getElementById('historico');
        const principalTitulo = document.getElementById('artigo-titulo');
        const principalData = document.getElementById('artigo-data');
        const principalConteudo = document.getElementById('artigo-conteudo');

        function exibirArtigo(art) {
            if (!art) return;
            principalTitulo.innerText = art.titulo;
            principalData.innerText = art.data;
            // .innerHTML permite que as tags HTML da planilha (<strong>, <p>, etc) funcionem
            principalConteudo.innerHTML = art.conteudo;
        }

        // 1. Exibe o artigo mais recente no topo
        exibirArtigo(artigos[0]);

        // 2. Limpa e preenche o dropdown de histórico
        dropdown.innerHTML = '<option value="">Selecione um artigo anterior...</option>';
        artigos.forEach((art, index) => {
            let opt = document.createElement('option');
            opt.value = index;
            opt.innerHTML = art.titulo;
            dropdown.appendChild(opt);
        });

        // Função global para o dropdown funcionar
        window.carregarArtigoSelecionado = (index) => {
            if (index !== "") {
                exibirArtigo(artigos[index]);
                // Rola a página suavemente para o topo do artigo
                document.getElementById('area-artigo').scrollIntoView({ behavior: 'smooth' });
            }
        };

    } catch (erro) {
        console.error("Erro ao carregar artigos:", erro);
        document.getElementById('artigo-titulo').innerText = "Erro ao carregar conteúdo.";
    }
}

// Inicia a carga assim que a página abrir
carregarArtigos();
