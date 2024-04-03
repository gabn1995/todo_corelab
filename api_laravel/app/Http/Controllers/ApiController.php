<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoChangeColorRequest;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    /**
     * Método para criar tarefa no database
     */
    public function createTodo(TodoRequest $request): JsonResponse
    {
        // Pegar dados que foram validados pela request
        $data = $request->only(['title', 'body', 'color', 'favorite', 'user_id']);
        
        // Criar tarefa no database
        $todo = Todo::create($data);

        $response = [
            'error' => '',
            // Pegar informação da tarefa que foi criada 
            'todo' => $todo
        ];
        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Método para ler todas as tarefas do usuário
     */
    public function readAllTodos(): JsonResponse
    {
        //Pegar todas as tarefas do usuário logado
        $todos = Todo::where('user_id', Auth::user()->id)->get();

        $response = [
            'error' => '',
            // Pegar todas as tarefas
            'todos' => $todos
        ];
        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Método para ler uma tarefa
     */
    public function readTodo($id): JsonResponse
    {
        // Recuperar tarefa do database e verificar o id e usuário
        $todo =  Todo::where('user_id', Auth::user()->id)->where('id', $id)->first();

        // Verificar se existe essa tarefa
        if ($todo) {
            $response = [
                'error' => '',
                // Pegar a tarefa
                'todo' => $todo
            ];
        } else {
            // Retorno de erro, caso o id sejá inválido e/ou usuário não seja dono da tarefa
            $response['error'] = 'Não é possível localizar essa Tarefa';
        }
        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Atualizar tarefa no database
     */
    public function updateTodo(TodoRequest $request, $id): JsonResponse
    {
        // Pegar dados que foram validados pela request
        $data = $request->only(['title', 'body', 'color', 'favorite', 'user_id']);

        // Pegar usuário logado
        $userId = Auth::user()->id;

        // Recuperar tarefa do database e verificar o id e usuário
        $todo = Todo::where('user_id', $userId)->where('id', $id)->first();

        // Verificar se existe a tarefa e verificar se não houve alteração de usuário
        if ($todo && ($data['user_id'] == $userId)) {
            // Atualizar tarefa no database
            $todo->update($data);

            $response = [
                'error' => '',
                // Pegar a tarefa
                'todo' => $todo
            ];
        } else {
            // Retorno de erro, caso o id sejá inválido e/ou usuário não seja dono da tarefa
            $response['error'] = 'Não é possível localizar essa Tarefa';
        }
        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Método para deletar tarefa no database
     */
    public function deleteTodo($id): JsonResponse
    {
        // Recuperar tarefa do database e verificar o id e usuário
        $todo = Todo::where('user_id', Auth::user()->id)->where('id', $id)->first();

        // Verificar se a tarefa existe
        if ($todo) {
            // Deletar tarefa no database
            $todo->delete();

            // Retorno sem erro
            $response = ['error' => ''];
        } else {
            // Retorno de erro, caso o id sejá inválido e/ou usuário não seja dono da tarefa
            $response['error'] = 'Não é possível localizar essa Tarefa';
        }
        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Método para marcar/desmarcar tarefa como favorita no database
     */
    public function favoriteTodo($id): JsonResponse
    {
        // Recuperar tarefa do database e verificar o id e usuário
        $todo = Todo::where('id', $id)->where('user_id', Auth::user()->id)->first();

        //Se a tarefa existir alterar o estado de favorite entre 1/0
        if ($todo) {
            // Alternar valor entre 1/0
            $todo->favorite = 1 - $todo->favorite;

            // Salvar tarefa no database com o novo valor
            $todo->save();

            // Retorno sem erro
            $response = ['error' => ''];
        } else {
            // Retorno de erro, caso o id sejá inválido e/ou usuário não seja dono da tarefa
            $response['error'] = 'Não é possível localizar essa Tarefa';
        }
        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Método para trocar cor da tarefa no databese
     */
    public function colorTodo(TodoChangeColorRequest $request, $id): JsonResponse
    {
        // Pegar dados que foram validados pela request
        $data = $request->only(['color']);

        // Recuperar tarefa do database e verificar o id e usuário
        $todo = Todo::where('id', $id)->where('user_id', Auth::user()->id)->first();

        //Se a tarefa existir alterar a cor
        if ($todo) {
            // Alterar a cor
            $todo->color = $data['color'];

            // Salvar tarefa no database com a nova cor
            $todo->save();

            // Retorno sem erro
            $response = ['error' => ''];
        } else {
            // Retorno de erro, caso o id sejá inválido e/ou usuário não seja dono da tarefa
            $response['error'] = 'Não é possível localizar essa Tarefa';
        }
        // Retorno das informações em formato JSON
        return response()->json($response);
    }
}
