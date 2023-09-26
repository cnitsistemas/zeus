export const mapFetchCountResponse = (response: any) => {
  return {
    totalStudents: response["totalAlunos"],
    totalRoutes: response["totalRotas"],
    totalUsers: response["totalUsuarios"],
  }
}

export const mapFetchHighlightsResponse = (response: any) => {
  return response["Grupos"].map((acc: any) => {
    const highlights = acc["Destaques"].map((item: any) => {
      return {
        deepLinking: item["DeepLinking"],
        description: item["Descricao"],
        image: item["Imagem"],
        origin: item["Ordem"],
        url: item["Url"]
      }
    }) || []

    return {
      highlights: highlights,
      name: acc["Nome"],
      imgUrl: acc["ImagemUrl"]
    }
  }) || []
}

export const mapFetchLastStudentsResponse = (response: any) => {
  return response["alunos"].map((acc: any) => {
    return {
      name: acc["nome"],
      route: acc["route"] && acc["route"]["nome"],
      shift: acc["turno"],
      teaching: acc["ensino"],
    } || []
  }) || []
}

export const mapFetchLastRoutesResponse = (response: any) => {
  return response["rotas"].map((acc: any) => {
    return {
      name: acc["nome"],
      initHours: `${acc["hora_ida_inicio"]} - ${acc["hora_ida_termino"]}`,
      finishHours: `${acc["hora_volta_inicio"]} - ${acc["hora_volta_termino"]}`,
      time: acc["tempo"],
    } || []
  }) || []
}

export const mapFetchHighlightsWorkResponse = (response: any) => {
  return [
    {
      highlights: response["Destaques"].map((item: any) => {
        return {
          deepLinking: item["DeepLinking"],
          description: item["Descricao"],
          image: item["Imagem"],
          origin: item["Ordem"],
          url: item["Url"]
        }
      }) || [],
      name: "WorkWithUs",
      imgUrl: null
    }
  ]
}

export const mapFetchEvidenceResponse = (response: any) => {
  return response["Destaques"].map((item: any) => {
    return {
      image: item["Imagem"]
    }
  })
}