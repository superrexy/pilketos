<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function voter()
    {
        return $this->belongsToMany(User::class, 'voting_candidate', 'candidate_id', 'user_id');
    }
}
