# CRYSTAL API

 >Existem dois tipos de pessoas no mundo, as que usam **DOCKER** e as que **não usam!**

## COM DOCKER :)
1 - `docker build -t crystal-api .` (aqui acontece uma mágica xD) <br>
2 - `docker run -it -p 9000:3001 -v $(pwd):/server crystal-api` agora é deitar e correr pro abraço <3 <br>

## SEM DOCKER :P
 1 - `git clone https://gitlab.com/redshift-team/backend.git`<br> 
 2 - `npm install`<br>
 3 - `npm run dev`<br>

Padawan após executar as instruções acima você estará pronto pra brilhar, tudo configurado com live-reload, só codificar, Ctrl+S e correr pro abraço.

Isso pode ser útil:

**NodeJS:** - é nossa plataforma para construir a API.<br>
**Express:** - é o nosso microframework para lidar com as rotas da aplicação.<br>
**MongoDB:** - é o nosso SGBD.<br>
**package.json:** - é um arquivo para controlar as dependências do projeto. OBS: possui devDependencies(depencencias pessoais xD)<br>
**package-lock.json:** - é só pra cache, se um pacote tem as mesmas dependências elas não serão baixadas novamente caso já exista.<br>

##### Sobre algumas dependências
**mongoose:** - fornece um mapeamento de objetos do MongoDB similar ao ORM (Object Relational Mapping), ou ODM (Object Data Mapping) no caso do Mongoose. Isso significa que o Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados pela aplicação, em outras palavras isso vai encapsular aqueles comandos via terminal maroto, vamos usar somente javascript para inserir, deletar, atualizar, etc. xD

# Documentação

Recurso **/USERS**: `http://localhost:9000/crystal/api/v1/users`

| Verbo | Recurso | Ação  |
|-------|--------------|-------|
| GET   |/users        | Mostrar todos os usuários cadastrados|
| GET   |/users/id     | Listar usuário |
| POST  |/users        | Criar um usuário |
| POST  |/users/authenticate    | Autenticar usuário |
| PUT  |/users/id    | Atualizar dados do usuario |
| DELETE  |/users/id    | Deletar usuário |

Exemplo **GET** - `http://localhost:9000/crystal/api/v1/users`
```json
[
 {
    "tags": "#semTag",
    "_id": "5bc9f1889de2ca47ca555d37",
    "name": "Arara Amarela",
    "email": "araraamarela@email.com",
    "description": "Gerente de Projeto",
    "createdAt": "2018-10-19T15:00:24.070Z",
    "__v": 0
 },
 {
    "tags": "#semTag",
    "_id": "5bc9fa6eae69be5249d6dfcd",
    "name": "Gavião Real",
    "email": "gaviaoreal@email.com",
    "description": "Product Owner",
    "createdAt": "2018-10-19T15:38:22.444Z",
    "__v": 0
 }
]
```
Exemplo **POST** - `http://localhost:9000/crystal/api/v1/users`
```json
{
    "name": "Julian Neys Levis",
    "password": "myon1isth",
    "email": "juliannll@email.com",
    "description": "Estudante de Computação Quântica, programador WEB.",
    "tags" : "#javascript #nodejs #angular #express #css #html #wordpress"
}
```
Exemplo **PUT** - `http://localhost:9000/crystal/api/v1/users/5bc9f1889de2ca47ca555d37`
```json
{
    "name": "Arara Amarela",
    "password": "newpass2018",
    "email": "araraamarela@email.com",
    "description": "Atuo com gestão de projetos.",
    "tags" : "#pmi #capm #scrum"
}
```
Exemplo **DELETE** - `http://localhost:9000/crystal/api/v1/users/5bc9fa6eae69be5249d6dfcd`
```json
{}
```
Recurso **/TEAMS**: `http://localhost:9000/crystal/api/v1/teams`