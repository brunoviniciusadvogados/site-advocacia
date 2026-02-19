const urlPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRU8LfoWc3Wdz61bxNPUjYfjUULYqlDPdWbVyZNu43YpJzUzPCV0muA7XtAeMMyqpj5vRdBLVEvtb1-/pub?output=tsv";

async function carregarDados() {
    try {
        const resposta = await fetch(urlPlanilha);
        const textoBruto = await resposta.text();
        const linhas = textoBruto.split(/\r?\n/).filter(l => l.trim() !== "");
        
        const artigos = linhas.slice(1).map(linha => {
            const cols = linha.split('\t');
            return { id: cols[0], titulo: cols[1], data: cols[2], conteudo: cols[3] };
        }).reverse();

        // SE ESTIVER NA PÁGINA INICIAL (INDEX)
        if (document.getElementById('home-titulo')) {
            const maisRecente = artigos[0];
            document.getElementById('home-titulo').innerText = maisRecente.titulo;
            document.getElementById('home-data').innerText = maisRecente.data;
            document.getElementById('home-conteudo').innerHTML = maisRecente.conteudo;
        }

        // SE ESTIVER NA PÁGINA DE ARTIGOS
        if (document.getElementById('artigo-titulo')) {
            const dropdown = document.getElementById('historico');
            
            function exibirArtigo(art) {
                document.getElementById('artigo-titulo').innerText = art.titulo;
                document.getElementById('artigo-data').innerText = art.data;
                document.getElementById('artigo-conteudo').innerHTML = art.conteudo;
            }

            exibirArtigo(artigos[0]);

            dropdown.innerHTML = '<option value="">Selecione um tema anterior...</option>';
            artigos.forEach((art, index) => {
                let opt = document.createElement('option');
                opt.value = index;
                opt.innerHTML = art.titulo;
                dropdown.appendChild(opt);
            });

            window.carregarArtigoSelecionado = (idx) => {
                if (idx !== "") {
                    exibirArtigo(artigos[idx]);
                    document.getElementById('area-artigo').scrollIntoView({ behavior: 'smooth' });
                }
            };
        }

    } catch (e) {
        console.error("Erro ao carregar planilha:", e);
    }
}

carregarDados();
