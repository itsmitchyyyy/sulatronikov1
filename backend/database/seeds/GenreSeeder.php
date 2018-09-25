<?php

use Illuminate\Database\Seeder;
use App\Genre;
class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genres = [
            'Action',
            'Adventure',
            'Anime',
            'Classics',
            'General Fiction',
            'Historical',
            'Horror',
            'Non Fiction'
        ];
        
        foreach($genres as $genre){
            $genra = new Genre();
            $genra->genreName = $genre;
            $genra->save();
        }
    }
}
