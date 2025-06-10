export const generateSmartTitle = (content: string) => {
  if (!content || content.trim().length === 0) {
    return "Nova entrada";
  }

  const text = content
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const words = text.split(/\s+/).filter((word) => word.length > 2);

  // Palavras que devem ser ignoradas (stopwords ampliada)
  const stopWords = new Set([
    // Pronomes e artigos
    "eu",
    "tu",
    "ele",
    "ela",
    "nos",
    "nós",
    "vos",
    "vós",
    "eles",
    "elas",
    "me",
    "te",
    "se",
    "nos",
    "vos",
    "lhe",
    "lhes",
    "o",
    "a",
    "os",
    "as",
    "um",
    "uma",
    "uns",
    "umas",
    "isso",
    "isto",
    "aquilo",
    // Verbos auxiliares/comuns
    "vou",
    "fui",
    "vai",
    "vamos",
    "iria",
    "estou",
    "está",
    "estava",
    "estive",
    "sou",
    "era",
    "ser",
    "foi",
    "são",
    "tem",
    "tinha",
    "tenho",
    "havia",
    "haver",
    "pode",
    "podia",
    "deve",
    "dever",
    "quer",
    "queria",
    "posso",
    "poder",
    "faz",
    "fazer",
    "fez",
    "feito",
    "fica",
    "ficar",
    "ficou",
    "fica",
    "ficando",
    "estavam",
    "estaremos",
    "seremos",
    "seria",
    "seriam",
    "seremos",
    "será",
    "serão",
    "seriam",
    "seria",
    "seremos",
    "será",
    "serão",
    // Palavras já presentes
    "que",
    "de",
    "do",
    "da",
    "dos",
    "das",
    "para",
    "por",
    "com",
    "sem",
    "sobre",
    "ate",
    "desde",
    "entre",
    "durante",
    "antes",
    "depois",
    "onde",
    "quando",
    "como",
    "porque",
    "pois",
    "mas",
    "porem",
    "entao",
    "assim",
    "tambem",
    "muito",
    "mais",
    "menos",
    "bem",
    "mal",
    "ainda",
    "ja",
    "sempre",
    "nunca",
    "aqui",
    "ali",
    "la",
    "ca",
    "esse",
    "esta",
    "aquele",
    "seu",
    "sua",
    "meu",
    "minha",
    "nosso",
    "nossa",
    "dele",
    "dela",
    "deles",
    "este",
    "esta",
    "estes",
    "estas",
    "aquele",
    "aquela",
    "aqueles",
    "aquelas",
    "outro",
    "outra",
    "outros",
    "outras",
    "mesmo",
    "mesma",
    "mesmos",
    "mesmas",
    "tanto",
    "tanta",
    "tantos",
    "tantas",
    "qual",
    "quais",
    "quanto",
    "quanta",
    "quantos",
    "quantas",
    "cada",
    "todo",
    "toda",
    "todos",
    "todas",
    "algo",
    "algum",
    "alguma",
    "alguns",
    "algumas",
    "nenhum",
    "nenhuma",
    "nenhuns",
    "nenhumas",
    "tudo",
    "nada",
    "ninguem",
    "alguem",
    "quem",
    "cujo",
    "cuja",
    "cujos",
    "cujas",
    "qual",
    "quais",
    "quanto",
    "quanta",
    "quantos",
    "quantas",
  ]);

  // Conectores importantes que devem ser mantidos
  const keepWords = new Set(["e", "depois", "antes", "para", "com"]);

  // Se o texto for muito curto, retorna ele mesmo capitalizado
  if (words.length <= 5) {
    const capitalized = content.charAt(0).toUpperCase() + content.slice(1);
    return capitalized;
  }

  // --- RESUMO NATURAL ---
  // Filtra palavras: mantém conectores e remove repetições
  const filtered: string[] = [];
  let lastWord = "";
  for (const word of words) {
    if (stopWords.has(word) && !keepWords.has(word)) continue;
    if (word === lastWord) continue;
    filtered.push(word);
    lastWord = word;
  }

  // Limita o tamanho do título
  const maxWords = 6;
  let title = filtered.slice(0, maxWords).join(" ");
  if (filtered.length > maxWords) {
    title += "...";
  }
  // Capitaliza só a primeira letra
  title = title.charAt(0).toUpperCase() + title.slice(1);

  // Se o resultado for razoável, retorna
  if (title.length > 0 && title.split(" ").length >= 2) {
    return title;
  }

  // Categorias principais
  const categories = {
    trabalho: {
      keywords: [
        "trabalho",
        "emprego",
        "entrevista",
        "entrevistas",
        "carreira",
        "profissional",
        "chefe",
        "gestor",
        "reuniao",
        "projeto",
        "escritorio",
        "empresa",
        "colega",
        "equipe",
        "cliente",
        "vendas",
        "meta",
        "objetivo",
        "promocao",
        "salario",
      ],
      label: "trabalho",
    },
    estudos: {
      keywords: [
        "estudar",
        "estudo",
        "prova",
        "exame",
        "faculdade",
        "universidade",
        "escola",
        "colegio",
        "aula",
        "professor",
        "curso",
        "disciplina",
        "materia",
        "nota",
        "aprovacao",
        "reprovacao",
        "formatura",
        "diploma",
        "certificado",
        "mestrado",
        "doutorado",
        "pesquisa",
        "tcc",
        "monografia",
        "dissertacao",
        "tese",
        "biblioteca",
        "livro",
        "apostila",
        "caderno",
      ],
      label: "estudos",
    },
    desafios: {
      keywords: [
        "desafio",
        "dificuldade",
        "problema",
        "obstaculo",
        "barreira",
        "luta",
        "esforco",
        "sacrificio",
        "cansado",
        "cansaco",
        "exausto",
        "estressado",
        "ansiedade",
        "preocupacao",
        "medo",
        "receio",
        "dificil",
        "complicado",
        "complexo",
        "desafiador",
        "superacao",
        "vitoria",
        "derrota",
        "fracasso",
        "sucesso",
        "conquista",
      ],
      label: "desafios",
    },
    reflexoes: {
      keywords: [
        "pensar",
        "pensamento",
        "reflexao",
        "refletir",
        "pensando",
        "duvida",
        "questionamento",
        "incerteza",
        "certeza",
        "conclusao",
        "decisao",
        "escolha",
        "opcao",
        "alternativa",
        "possibilidade",
        "futuro",
        "passado",
        "presente",
        "momento",
        "vida",
        "existencia",
        "sentido",
        "proposito",
        "valor",
        "importancia",
        "significado",
      ],
      label: "reflexões",
    },
  };

  // Conta as ocorrências e armazena as palavras-chave encontradas
  const categoryScores: { [key: string]: { count: number; words: string[] } } =
    {};
  for (const [category, data] of Object.entries(categories)) {
    let count = 0;
    const foundWords: string[] = [];
    for (const word of words) {
      if (stopWords.has(word)) continue;
      if (data.keywords.includes(word)) {
        count++;
        foundWords.push(word);
      }
    }
    categoryScores[category] = { count, words: foundWords };
  }

  // Categorias concretas
  const concreteCategories = ["trabalho", "estudos", "desafios"];
  const concreteSorted = concreteCategories
    .map((cat) => ({ cat, count: categoryScores[cat].count }))
    .filter((obj) => obj.count > 0)
    .sort((a, b) => b.count - a.count);

  // Se houver pelo menos duas categorias concretas relevantes, monta título composto
  if (concreteSorted.length >= 2) {
    return `Reflexões sobre ${
      categories[concreteSorted[0].cat as keyof typeof categories].label
    } e ${categories[concreteSorted[1].cat as keyof typeof categories].label}`;
  }

  // Se só uma concreta e reflexões também pontuou, monta "Reflexões sobre [concreta]"
  if (concreteSorted.length === 1 && categoryScores["reflexoes"].count > 0) {
    return `Reflexões sobre ${
      categories[concreteSorted[0].cat as keyof typeof categories].label
    }`;
  }

  // Se só reflexões pontuou
  if (categoryScores["reflexoes"].count > 0 && concreteSorted.length === 0) {
    return "Reflexões do dia";
  }

  // Fallback: primeira frase
  const sentences = content.split(/[.!?]/);
  const firstSentence = sentences[0].trim();
  if (firstSentence.length > 10 && firstSentence.length <= 50) {
    return firstSentence;
  }
  if (firstSentence.length > 50) {
    return firstSentence.substring(0, 47) + "...";
  }

  // Fallback horário
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Reflexões matinais";
  } else if (hour >= 12 && hour < 18) {
    return "Reflexões da tarde";
  } else {
    return "Reflexões noturnas";
  }
};
