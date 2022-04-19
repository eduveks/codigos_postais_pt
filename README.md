# 🇵🇹  Codigos Postais - Portugal

Base de dados dos códigos postais de Portugal, com interface web e pesquisas.

### Administração - Dashboard

Na área reservada disponibilia a tabela de consulta geral de todos os dados:

![Dashboard](https://raw.githubusercontent.com/eduveks/codigos_postais_pt/main/docs/dashboard.jpg)

Suporta paginação, filtros, ordenação e gerir a quantidade de registos por página.

### Estrutura de Dados & Arquitetura 

Aplicação web criada com a plataforma [Netuno](https://www.netuno.org/) e a base de dados [PostgreSQL](https://www.postgresql.org/).

Interfaces web do dashboard desenvolvido com [ReactJS](https://reactjs.org/) & [Ant.Design](https://ant.design/) consumir serviços da [API REST](https://doc.netuno.org/docs/pt-PT/academy/server/services/rest/) desenvolvida em [Netuno/JS](https://doc.netuno.org/docs/pt-PT/business/polyglot/#linguagens-de-programa%C3%A7%C3%A3o).

Estrutura dos Dados  |  Arquitetura
:-------------------------:|:-------------------------:
![Estrutura dos Dados](https://raw.githubusercontent.com/eduveks/codigos_postais_pt/main/docs/estrutura-dos-dados.jpg)  |  ![Register](https://raw.githubusercontent.com/eduveks/codigos_postais_pt/main/docs/arquitetura.png)

## Instalação

- [Instalar a plataforma Netuno](https://doc.netuno.org/docs/pt-PT/installation/);

- Instalar o PostgreSQL:
    - Debian/Ubuntu: `~# sudo apt install postgresql`

### Configurar Base de Dados

##### Debian/Ubuntu:

Entrar no PSQL:

```
~# sudo -u postgres psql
```

Criar o utilizador de base de dados com a respectiva password:

```
postgres=# CREATE USER codigos_postais_pt WITH ENCRYPTED PASSWORD 'dbSe6r3d0!';
```

- [Gerar passwords aleatórias](https://www.random.org/passwords/).


Criar a base de dados associada ao novo utilizador:

```
postgres=# CREATE DATABASE codigos_postais_pt OWNER codigos_postais_pt;
```

Sair do PSQL:

```
postgres=# \q
```

Entrar na nova base de dados dos Códigos Postais:

```
~# sudo -u postgres psql codigos_postais_pt
```

Criar a exenção do PostgreSQL para gerar os UUID/GUID, requisito do Netuno:

```
codigo_postal_pt=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Sair do PSQL:

```
postgres=# \q
```

## Aplicação

### Netuno

No terminal clonar este repositório GIT dentro da pasta `apps` que encontra-se na raíz do Netuno:

```
git clone https://github.com/eduveks/codigos_postais_pt.git
```

A pasta da aplicação Netuno foi criada `codigos_postais_pt`.

### Configuração

No terminal dentro da pasta da aplicação (`netuno/apps/codigos_postais_pt`), copiar a configuração de exemplo como configuração de desenvolvimento:

```
cp config/exemplo.json config/_development.json
```

Editar e ajustar as configurações de base de dados neste novo ficheiro `_development.json`, especialmente por o valor correto para o utilizador (`db.default.username`) e a palavra-passe (`db.default.password`).

### Executar

Executar a aplicação no terminal dentro da pasta raíz do Netuno com o seguinte comando:

```
./netuno server app=codigos_postais_pt
```

## Importação da Base de Dados

##### Debian/Ubuntu:

Entrar no PSQL:

```
~# sudo -u postgres psql codigos_postais_pt                                            
```

Realizar a importação do script de base de dados:

```
codigos_postais_pt=# \i dbs/postgresql-dump.sql
```

