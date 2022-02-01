<?php

namespace App\Http\Controllers\Permissions;

use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index()
    {
        return inertia('admin/assign/users/Index', [
            'users' => User::has('roles')->with('roles')->get(),
            'roles' => Role::get(),
        ]);
    }

    public function create()
    {
        return inertia('admin/assign/users/Create', [
            'roles' => Role::get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nrp' => ['required', 'numeric'],
            'roles' => ['required', 'array'],
        ]);

        $user = User::whereNrp($request->nrp)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'nrp' => 'NRP in our records not found'
            ]);
        }

        $user->syncRoles(Arr::pluck($request->roles, 'label'));

        return redirect(route('admin.assign.users.index'))->with(['status' => 'success', 'messages' => 'The user roles has been assign']);
    }

    public function edit(User $user)
    {
        return inertia('admin/assign/users/Edit', [
            'user' => $user,
            'user_roles' => User::whereNrp($user->nrp)->with('roles')->first(),
            'roles' => Role::get(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'nrp' => ['required', 'numeric'],
            'roles' => ['array'],
        ]);

        $user->syncRoles(Arr::pluck($request->roles, 'label'));

        return redirect(route('admin.assign.users.index'))->with(['status' => 'success', 'messages' => 'The user roles has been synced']);
    }
}
