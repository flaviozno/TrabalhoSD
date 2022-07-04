
# Trabalho de Sistemas Distribuidos

Aluno: Flávio Vezono Filho - 11921BCC014


## Installation

- É preciso ter o node instalado (v16.15.1)
- É necessario criar um docker com mongoose para conectar com a api
- Execute um ``` npm install``` / ``` yarn``` dentro da pasta ```./api``` ```./grpc/```
- Em ambas as pastas, execute ``` yarn dev```
- Talvez seja necessario executar ```npm install -g node-gyp``` para rodar o **mosca**.


## Run

  Para rodar, basta abrir o [Insomnia](https://insomnia.rest/download) e importar o arquivo **Insomnia_2022-07-03.json**. Com a api e o grpc rodando será possivel realizar os teste de:

  - Adicionar um ADMIN
  - Criar um user
  - Deletar um user
  - Consultar um ADMIN e um USER
  - Update em um user

  A api foi criada usando [Express](https://expressjs.com/). Porém comecei a implementar a mqtt junto com o grpc para cadastrar os dados no banco do **Mongo**

```bash
  docker run -d --name=mongoDocker -p 27017:27017 bitnami/mongodb

  docker ps
```

- [Mongoodb](https://www.mongodb.com/try/download/compass)
- [Node](https://nodejs.org/en/download/)

  ## Infos

  As implementações do grpc então na pasta ***proto***. A api fornece uma roda por meio do express e dentro da pasta ***controlles*** as funções do grpc são chamadas. A api roda em ***http://localhost:3333*** ,o grpc está setado para rodar na porta ***3334*** e o mongo na porta ***27017***. Dentro do mongo, será gerado um database chamada ***TrabalhoSD*** com as collection admin e user.

  A idéia é substituir o express pelo mqtt. Porém estou com dificuldades para rodar ele no nodejs.
## Authors

- [@flaviozno](https://www.github.com/flaviozno)


## License

[MIT](https://choosealicense.com/licenses/mit/)

