<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Rotas de autenticação */
// Rota de não autorizado
Route::get('/unauthenticated', [AuthController::class, 'unauthenticated'])->name('login');

// Rota para registrar usuário
Route::post('/user', [AuthController::class, 'create']);

// Rota para logar usuário
Route::post('/auth/login', [AuthController::class, 'login']);

// Rota para pegar usuário associado a um token - o usuário tem que está logado
Route::middleware('auth:sanctum')->post('/auth/me', [AuthController::class, 'me']);

// Rota para fazer logout - o usuário tem que está logado
Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);
/* end-Rotas de autenticação */

// Rotas que necessitam de autenticação
Route::middleware('auth:sanctum')->group(function(){
    /* CRUD das Tarefas */
    // POST /todo = Inserir uma tarefa no sistema
    Route::post('/todo', [ApiController::class, 'createTodo']);
    
    // GET /todos = Ler todas as tarefas do sistema
    Route::get('/todos', [ApiController::class, 'readAllTodos']);
    
    // GET /todo/2 = Ler uma tarefa específica do sistema
    Route::get('/todo/{id}', [ApiController::class, 'readTodo']);
    
    // PUT /todo/2 = Atualizar uma tarefa no sistema
    Route::put('/todo/{id}', [ApiController::class, 'updateTodo']);
    
    // DELETE /todo/2 = Deletar uma tarefa no sistema
    Route::delete('/todo/{id}', [ApiController::class, 'deleteTodo']);
    /* end-CRUD das Tarefas */

    // PUT /todo/2/favorite = Marcar/desmarcar como favorito uma tarefa no sistema
    Route::put('/todo/{id}/favorite', [ApiController::class, 'favoriteTodo']);
    
    // PUT /todo/2/color = Trocar a cor de uma tarefa do sistema
    Route::put('/todo/{id}/color', [ApiController::class, 'colorTodo']);
});


