<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Método para registrar usuário no database 
     * e logar o usuário no sistema, caso o cadastro tenha sucesso
     */
    public function create(RegisterRequest $request): JsonResponse {
        // Pegar dados que foram validados pela request
        $data = $request->only(['name', 'email', 'password']);

        // Criptografar senha para salvar hash no database
        $data['password'] = Hash::make($data['password']);

        // Criar usuário no database
        $user = User::create($data);

        $response = [
          'error' => ''  ,
          // Gerar Token
          'token' => $user->createToken('Register_token')->plainTextToken
        ];

        // Retorno das informações em formato JSON
        return response()->json($response);
    }

    /**
     * Método para logar usuárrio no sistema
     */
    public function login(LoginRequest $request): JsonResponse {
        // Pegar dados que foram validados pela request
        $data = $request->only(['email', 'password']);

        // Verificar autenticação usuário
        if(Auth::attempt($data)){
            // Pegar usuário logado
            $user = Auth::user();
            $response = [
              'error' => ''  ,
              // Gerar Token
              'token' => $user->createToken('Register_token')->plainTextToken
            ];
            // Retorno das informações em formato JSON
            return response()->json($response);
        }
        // Retorno de erro em formato JSON
        return response()->json(['error' => 'Usuário ou Senha Inválidos']);
    }

    /**
     * Método para deslogar o usuário do sistema
     */
    public function logout(Request $request): JsonResponse {
        // Pegar usuário logado
        $user = $request->user();

        // Deletar os tokens do usuário logado
        $user->tokens()->delete();

        // Retorno das informações em formato JSON
        return response()->json(['error' => '']);
    }

    /**
     * Método para pegar usuário associado a um token
     */
    public function me(): JsonResponse {
        // Retorno das informações em formato JSON
        $response = [
            'error' => '',
            // Pegar usuário
            'user' => Auth::user(),
        ];
        return response()->json($response);
    }

    /**
     * Método para mostrar mensagem de erro para usuário não autenticado
     */
    public function unauthenticated(): JsonResponse {
        // Retorno das informações em formato JSON
        return response()->json(['error' => 'Usuário não está logado.']);
    }
}
