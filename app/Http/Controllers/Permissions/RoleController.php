<?php

namespace App\Http\Controllers\Permissions;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('admin/roles/Index', [
            'roles' => Role::get(),
        ]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'guard_name' => ['required'],
        ]);

        Role::create($attributes);

        return back()->with([
            'status' => 'success',
            'messages' => "Role {$attributes['name']} was Created"
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'guard_name' => ['required'],
        ]);

        $role->update($attributes);

        return back()->with([
            'status' => 'success',
            'messages' => "Role {$attributes['name']} was Updated"
        ]);
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return back()->with([
            'status' => 'success',
            'messages' => "Role was Deleted"
        ]);
    }
}
