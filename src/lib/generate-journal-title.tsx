export const generateSmartTitle = (content: string) => {
  if (!content || content.trim().length === 0) {
    return "Nova entrada";
  }

  const text = content
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
  const words = text.split(/\s+/).filter((word) => word.length > 2); // Remove palavras muito pequenas

  // Palavras que devem ser ignoradas
  const stopWords = new Set([
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
    "isso",
    "isto",
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

  // Categorias principais com suas palavras-chave
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
      titles: [
        "Dia de trabalho",
        "Reflexões profissionais",
        "No escritório",
        "Desafios do trabalho",
        "Vida corporativa",
      ],
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
      titles: [
        "Vida acadêmica",
        "Nos estudos",
        "Aprendizado",
        "Desafios acadêmicos",
        "Conhecimento",
      ],
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
      titles: [
        "Reflexões profundas",
        "Pensamentos do dia",
        "Momento de reflexão",
        "Questões existenciais",
        "Pensando na vida",
      ],
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
      titles: [
        "Desafios do dia",
        "Superando obstáculos",
        "Momentos difíceis",
        "Lutas diárias",
        "Enfrentando desafios",
      ],
    },
  };

  // Conta as ocorrências de palavras-chave para cada categoria
  const categoryScores: { [key: string]: number } = {};

  for (const [category, data] of Object.entries(categories)) {
    let score = 0;
    for (const word of words) {
      if (stopWords.has(word)) continue;
      if (data.keywords.includes(word)) {
        score += 1;
      }
    }
    categoryScores[category] = score;
  }

  // Encontra a categoria com maior pontuação
  let bestCategory = "reflexoes"; // Categoria padrão
  let maxScore = 0;

  for (const [category, score] of Object.entries(categoryScores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }

  // Se encontrou uma categoria com pontuação significativa
  if (maxScore > 0) {
    const titles = categories[bestCategory as keyof typeof categories].titles;
    return titles[Math.floor(Math.random() * titles.length)];
  }

  // Se não encontrou uma categoria específica, usa a primeira frase do texto
  const sentences = content.split(/[.!?]/);
  const firstSentence = sentences[0].trim();

  if (firstSentence.length > 10 && firstSentence.length <= 50) {
    return firstSentence;
  }

  if (firstSentence.length > 50) {
    return firstSentence.substring(0, 47) + "...";
  }

  // Fallback para um título genérico baseado no horário
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Reflexões matinais";
  } else if (hour >= 12 && hour < 18) {
    return "Reflexões da tarde";
  } else {
    return "Reflexões noturnas";
  }
};
