<?php

namespace App\Http\Controllers;

use App\Events\PilketosVote;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PilketosController extends Controller
{
    public function index()
    {
        return inertia('pilketos/Index', [
            'candidates' => Candidate::get(),
        ]);
    }

    public function vote_candidate(Candidate $candidate)
    {
        $vote = Auth::user()->voting()->save($candidate);

        event(new PilketosVote($vote));

        Auth::logout();

        return redirect(route('auth.login'))->with([
            'status' => 'success',
            'messages' => 'Success Voting Candidate'
        ]);
    }
}
