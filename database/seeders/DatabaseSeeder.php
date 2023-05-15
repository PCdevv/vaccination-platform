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
            [
            'id_card_number' => '4444',
            'password' => bcrypt('pass'),
            'name'=> 'saia',
            'born_date'=> date('Y-m-d'),
            'gender'=> 'female',
            'address'=> 'Jl. jalan',
            'regional_id'=> 1,
            'login_tokens' => null
        ],
            [
            'id_card_number' => '4445',
            'password' => bcrypt('pass'),
            'name'=> 'saia',
            'born_date'=> date('Y-m-d'),
            'gender'=> 'female',
            'address'=> 'Jl. jalan',
            'regional_id'=> 1,
            'login_tokens' => null
        ]
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

        DB::table('sessions')->insert(
            [[
            'spot_id' => 1,
            'start_time' => '09:00:00',
            'end_time' => '11:00:00'
        ],
        [
            'spot_id' => 1,
            'start_time' => '13:00:00',
            'end_time' => '15:00:00'
        ],
        [
            'spot_id' => 1,
            'start_time' => '15:00:00',
            'end_time' => '17:00:00'
        ]]
    );

        DB::table('slots')->insert([
            [
            'spot_id' => 1,
            'session_id' => 1,
            'queue' => 1
        ],
            [
            'spot_id' => 1,
            'session_id' => 1,
            'queue' => 2
        ],
            [
            'spot_id' => 1,
            'session_id' => 1,
            'queue' => 3
        ],
            [
            'spot_id' => 1,
            'session_id' => 1,
            'queue' => 4
        ],
            [
            'spot_id' => 1,
            'session_id' => 1,
            'queue' => 5
            ],
            [
            'spot_id' => 1,
            'session_id' => 2,
            'queue' => 6
        ],
            [
            'spot_id' => 1,
            'session_id' => 2,
            'queue' => 7
        ],
            [
            'spot_id' => 1,
            'session_id' => 2,
            'queue' => 8
        ],
            [
            'spot_id' => 1,
            'session_id' => 2,
            'queue' => 9
        ],
            [
            'spot_id' => 1,
            'session_id' => 2,
            'queue' => 10
            ],
            [
                'spot_id' => 1,
                'session_id' => 3,
                'queue' => 11
            ],
                [
                'spot_id' => 1,
                'session_id' => 3,
                'queue' => 12
            ],
                [
                'spot_id' => 1,
                'session_id' => 3,
                'queue' => 13
            ],
                [
                'spot_id' => 1,
                'session_id' => 3,
                'queue' => 14
            ],
                [
                'spot_id' => 1,
                'session_id' => 3,
                'queue' => 15
            ]
        ]
    );
    }
}
