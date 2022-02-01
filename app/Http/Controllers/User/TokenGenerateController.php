<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TokenGenerateController extends Controller
{
    public function index()
    {
        return inertia('admin/token/Index');
    }

    public function generate(Request $request)
    {
        $request->validate([
            'nrp' => ['required'],
        ]);

        $token = Str::random(6);
        $user = User::whereNrp($request->nrp)->first();
        $user->password = bcrypt($token);
        $user->save();

        return back()->with('token', "Token NRP {$request->nrp} adalah {$token}");
    }
}
