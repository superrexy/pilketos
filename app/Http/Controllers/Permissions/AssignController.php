<?php

namespace App\Http\Controllers\Permissions;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class AssignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('admin/assign/Index', [
            'roles' => Role::with('permissions')->get(),
        ]);
    }

    public function edit(Role $role)
    {
        return inertia('admin/assign/Edit', [
            'roles' => Role::with('permissions')->get(),
            'role' => $role,
            'role_permissions' => $role->permissions()->get(),
            'permissions' => Permission::get(),
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'permissions' => ['required', 'array']
        ]);

        $role->syncPermissions(Arr::pluck($request->permissions, 'label'));

        return redirect(route('admin.assign.index'))->with(['status' => 'success', 'messages' => 'The permissions has been synced']);
    }
}
