<?php

use Illuminate\Database\Seeder;
use App\Role;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['$author', '$writer', '$publisher'];
        foreach($roles as $role){
            $data = str_replace('$','',$role);
            $role = new Role();
            $role->name = $data;
            $role->save();
        }
    }
}
