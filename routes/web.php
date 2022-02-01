<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PilketosController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\Permissions\AssignController;
use App\Http\Controllers\Permissions\PermissionController;
use App\Http\Controllers\Permissions\RoleController;
use App\Http\Controllers\Permissions\UserController;
use App\Http\Controllers\User\TokenGenerateController;
use App\Http\Controllers\User\UserController as UserPilketosController;

Route::middleware(['auth', 'hasVote'])->group(function () {
    Route::get('/', [PilketosController::class, 'index'])->name('pilketos.index');
    Route::post('{candidate}/vote', [PilketosController::class, 'vote_candidate'])->name('pilketos.vote');
});

Route::prefix('admin')->middleware(['auth', 'hasRole'])->name('admin.')->group(function () {
    Route::get('/', AdminController::class)->name('index');

    Route::prefix('kandidat')->name('kandidat.')->group(function () {
        Route::get('/', [CandidateController::class, 'index'])->name('index');
        Route::post('/', [CandidateController::class, 'store']);

        Route::put('{candidate}/edit', [CandidateController::class, 'update'])->name('update');
        Route::delete('{candidate}/delete', [CandidateController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('role-and-permission')->middleware(['can:role-permission'])->group(function () {
        Route::apiResource('roles', RoleController::class)->except(['show']);
        Route::apiResource('permissions', PermissionController::class)->except(['show']);

        Route::prefix('assign')->name('assign.')->group(function () {
            Route::get('', [AssignController::class, 'index'])->name('index');
            Route::get('{role}/edit', [AssignController::class, 'edit'])->name('edit');
            Route::put('{role}/edit', [AssignController::class, 'update']);

            Route::prefix('users')->name('users.')->group(function () {
                Route::get('', [UserController::class, 'index'])->name('index');
                Route::get('create', [UserController::class, 'create'])->name('create');
                Route::post('create', [UserController::class, 'store']);

                Route::get('{user}/edit', [UserController::class, 'edit'])->name('edit');
                Route::put('{user}/edit', [UserController::class, 'update']);
            });
        });
    });

    Route::prefix('users-and-token')->middleware(['can:token-users'])->group(function () {
        Route::apiResource('users', UserPilketosController::class)->except(['show']);
        Route::post('users/import-csv', [UserPilketosController::class, 'import'])->name('users.import');

        Route::get('token', [TokenGenerateController::class, 'index'])->name('token.index');
        Route::post('token', [TokenGenerateController::class, 'generate']);
    });
});


Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('auth.login');
    Route::post('/login', [LoginController::class, 'create']);
});

Route::post('/logout', [LoginController::class, 'logout'])->middleware(['auth'])->name('auth.logout');
