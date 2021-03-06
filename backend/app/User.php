<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName', 
        'username',
        'email',
        'password',
        'lastName', 
        'contact',
        'company',
        'address',
        'city',
        'state',
        'zipcode',
        'biography',
        'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function authorizeRoles(){
        if(is_array($roles)){
            return hasAnyRole($roles) || 
                abort(401, 'This action is unauthorized');
        }
        return hasRole($roles) || 
            abort(401, 'This action is unauthorized');
    }

    public function hasAnyRole($roles){
        return null !== $this->roles()->whereIn('name', $roles)->first();
    }

    public function hasRole($roles){
        return null !== $this->roles()->where('name', $roles)->first();
    }
}
