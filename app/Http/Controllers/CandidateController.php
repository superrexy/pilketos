<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    public function index()
    {
        return inertia('admin/kandidat/Index', [
            'candidates' => Candidate::get(),
        ]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'visi' => ['required'],
            'misi' => ['required'],
            'image' => ['required', 'image'],
        ]);

        $attributes['image'] = time() . '-' . $request->file('image')->getClientOriginalName();
        $request->file('image')->storeAs('images/candidates', $attributes['image'], 'public');

        Candidate::create($attributes);

        return back()->with([
            'status' => 'success',
            'messages' => 'Kandidate was created'
        ]);
    }

    public function update(Request $request, Candidate $candidate)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'visi' => ['required'],
            'misi' => ['required'],
        ]);

        if($request->hasFile('image')) {
            $attributes['image'] = time() . '-' . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('images/candidates', $attributes['image'], 'public');
        }

        $candidate->update($attributes);

        return back()->with([
            'status' => 'success',
            'messages' => 'Kandidate was updated'
        ]);
    }

    public function destroy(Candidate $candidate)
    {
        Storage::disk('public')->delete("images/candidates/{$candidate->image}");
        $candidate->delete();

        return back()->with([
            'status' => 'success',
            'messages' => 'Kandidate was deleted'
        ]);
    }
}
