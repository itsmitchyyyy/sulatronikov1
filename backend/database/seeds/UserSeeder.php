<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\User;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['$author', '$writers', '$publisher'];
        
        foreach($roles as $role){
            $data = str_replace('$','',$role);
            $digits = 9;
            $user_role = Role::where('name', $data)->first();
            $role = new User();
            $role->username = $data;
            $role->password = Hash::make($data);
            $role->email = $data.'@sulatroniko.com';
            $role->firstName = $data;
            $role->lastName = $data;
            $role->contact = str_pad(rand(0, pow(10, $digits)-1), $digits, '0', STR_PAD_LEFT);
            $role->company = 'Company';
            $role->city = 'City';
            $role->state = 'State';
            $role->zipcode = rand(pow(10, 6-1), pow(10, 6)-1);
            $role->save();
            $role->roles()->attach($user_role);
        }
    }
}
