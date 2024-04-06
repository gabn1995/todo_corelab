# Laravel PHP Framework e ReactJS - Todo (desafio da empresa Corelab)


## O que é este projeto?
O projeto tem como objetivo o desenvolvimento de um sistema que permite o usuário gerenciar tarefas.

## Para rodar o back-end deste projeto
- Necessário PHP habilitado.
- Necessário MySQL habilitado.
- Necessário que tenha database como mesmo nome do arquivo .env do back-end e todos dados de comunicação com MySQL esteja corretos.
- Necessário Composer instalado.

```bash
git clone https://github.com/gabn1995/todo_corelab.git
cd todo_corelab
cd api_laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate #antes de rodar este comando verifique sua configuracao com banco em .env
php artisan serve
```

## Para rodar o front-end deste projeto
- Necessário abrir outra aba do terminal com o mesmo caminho.
- Necessário Node.js instalado.
- Necessário NPM instalado.

```bash
cd todo_corelab
cd frontend_react
npm install
npm start
```
Acesssar pela url: http://localhost:3000/

## Pré-requisitos
- PHP >= ^7.4
- Laravel: ^8.0
- MySQL: ^5.4.27
- Node: ^16.15.0
- NPM: ^8.5.5
- Framework: React TS