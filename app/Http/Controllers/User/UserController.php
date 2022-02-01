<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('admin/users/Index', [
            'users' => User::paginate(10),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'nrp' => ['required', 'min:10', 'max:10', 'unique:users,nrp']
        ]);

        $attributes['password'] = bcrypt(Str::random(6));

        User::create($attributes);

        return back()->with([
            'status' => 'success',
            'messages' => 'User was created'
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file']
        ]);

        Excel::import(new UsersImport, $request->file('file'));

        return back()->with([
            'status' => 'success',
            'messages' => 'Users was created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return back()->with([
            'status' => 'success',
            'messages' => 'User was deleted'
        ]);
    }
}
