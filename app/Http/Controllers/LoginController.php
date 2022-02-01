<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('auth/Login');
    }

    public function create(Request $request)
    {
        $request->validate([
            'nrp' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt(['nrp' => $request->nrp, 'password' => $request->password])) {
            $request->session()->regenerate();

            return redirect(route('pilketos.index'))->with([
                'status' => 'success',
                'messages' => 'Successfully Login'
            ]);
        }

        throw ValidationException::withMessages([
            'nrp' => 'The provide credentials does not match our record.'
        ]);
    }

    public function logout()
    {
        Auth::logout();

        return redirect(route('auth.login'))->with([
            'status' => 'success',
            'messages' => 'Successfully Logout'
        ]);
    }
}
