<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Consultation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('regionals')->insert([
            "province" => "Jawa Tengah",
            "district" => "Banjarnegara"
        ]);

        DB::table('societies')->insert([
            'id_card_number' => '4444',
            'password' => bcrypt('pass'),
            'name'=> 'saia',
            'born_date'=> date('Y-m-d'),
            'gender'=> 'female',
            'address'=> 'Jl. jalan',
            'regional_id'=> 1,
            'login_tokens' => null
        ]);

        DB::table('spots')->insert([
            'regional_id' => '1',
            'name' => 'Rumah Sehat',
            'address' => 'Jl. Sehat',
            'serve' => '3',
            'capacity' => '5'
        ]);

        DB::table('vaccines')->insert([
                ['name' => 'Sinovac'],
                ['name' => 'AstraZeneca'],
                ['name' => 'Moderna'],
                ['name' => 'Pfizer'],
                ['name' => 'Sinnopharm']            
        ]);
        // DB::table('consultations')->insert([
        //         'society_id' => 1,
        //         'status' => "accepted",
        //         'disease_history' => "some text",
        //         'current_symptoms' => "some text"
        // ]);

        DB::table('users')->insert([
                'username' => "Halima Yuniar",
                'password' => bcrypt("doktah")
        ]);

        DB::table('medicals')->insert([
            'spot_id' => 1,
            'user_id' => 1,
            'role' => "doctor",
            'name' => "Dr. Halima Yuniar"
        ]);
    }
}
