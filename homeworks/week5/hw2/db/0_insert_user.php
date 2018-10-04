<?
require './conn.php';

$users = [
"Scott and Zelda Fitzgerald",
"Jean Cocteau",
"Brick top",
"Hemingway",
"Mark Twain",
"Sertride Stein",
"Belmonte",
"Pablo",
"Adriana",
"Amedeo",
"Modigliani",
"Cole Porter",
"Define",
"Archibald MacLeish",
"Dejuan Barnes",
"Dal",
"Señor Bunuel",
"Man Ray",
"Tom Stearns Eliot",
"Matisse",
"Paul Gaugin",
"Degas",
"Lautrec",
"Richard"];


$nicknames = [
"Bad Mr. Frosty",
"Kraken",
"Boomer",
"Lumberjack",
"Boomerang",
"Mammoth",
"Boss",
"Mastadon",
"Budweiser",
"Master",
"Bullseye",
"Meatball",
"Buster",
"Mooch",
"Butch",
"Mr. President",
"Buzz",
"Outlaw",
"Canine",
"Ratman",
"Captian RedBeard",
"Renegade",
"Champ",
"Sabertooth",
"Coma",
"Scratch",
"Crusher",
"Sentinel",
"Diesel",
"Speed",
"Doctor",
"Spike",
"Dreads",
"Subwoofer",
"Frankenstein",
"Thunderbird",
"Froggy",
"Tornado",
"General",
"Troubleshoot",
"Godzilla",
"Vice",
"Hammerhead",
"Viper",
"Handy Man",
"Wasp",
"Hound Dog",
"Wizard",
"Indominus",
"Zodiac",
"King Kong",
"Rocky",
"Caesar",
"Godzilla",
"Robin Hood",
"Joker",
"Kraken",
"Butch Cassidy",
"Goldfinger",
"Frankenstein",
"Sundance Kid",
"Sherlock",
"Terminator",
"Superman",
"Watson",
"Mad Max",
"Tarzan",
"Grinch",
"Tin Man",
"Rooster",
"Popeye",
"Scarecrow",
"Moses",
"Bullwinkle",
"Chewbacca",
"Jesus",
"Daffy",
"Han Solo",
"Zorro",
"Porky",
"Captain Redbeard",
"Batman",
"Mr. Magoo",
"Blackbeard",
"Lincoln",
"Jetson",
"HAL",
"Hannibal",
"Panther",
"Wizard",
"Darth Vader",
"Gumby",
"Zodiac",
"Alien",
"Underdog",
"V-Mort",
"The Shark",
"Sylvester",
"C-Brown",
"Martian",
"Space Ghost",
"Finch",
"Dracula",
"Felix",
"Indiana",
"Kevorkian",
"Jungle Man",
"Agent 99",
"Mad Dog",
"Alias",
"Moonshine",
"Blueberry",
"Mustang",
"Black Lotus",
"Neptune",
"Black Widow",
"Number Six",
"Bonbon",
"Opaline",
"Butterfly",
"Princess Peach",
"Champagne",
"Radar",
"Chardonnay",
"Sgt. Calhoun",
"Claws",
"Shadow",
"Copycat",
"Sphinx",
"Dahlia",
"Subzero",
"Dollface",
"Sugar Plum",
"Dragonfly",
"Trinity",
"Eclipse",
"Twister",
"Epiphany",
"Twizzler",
"The Evil Queen",
"Uhura",
"Firefly",
"Venus",
"Frostbite",
"Vicious",
"Hurricane",
"Vivi",
"Jessica Rabbit",
"Wind",
"Jetta",
"Winger",
"Katniss",
"Winter",
"Lady Luck",
"Wonder Woman",
"Lunar",
"Zelda",
"Cinderella",
"Turanga",
"Alias",
"Ella",
"Killer Frost",
"Number Six",
"Katniss",
"Batgirl",
"Princess Peach",
"Scarlet",
"Betty Boop",
"Trinity",
"Granger",
"Goldilocks",
"Venom",
"Princess",
"Reno",
"Poison Ivy",
"The Bride",
"Jo Jo",
"Superwoman",
"Poppins",
"Sabriel",
"Zelda",
"Dorothy",
"Ezzie",
"Lady Luck",
"Juno",
"Sphinx",
"Wonder Woman",
"Wicked",
"Isis",
"Uhura",
"Mrs. Robinson",
"Aphrodite",
"Jessica Rabbit",
"Baby Doll",
"Artemis",
"The Evil Queen",
"Zena",
"Athena",
"Snow White",
"Rapunzel",
"Cupid"
];

for ($i=0; $i < count($users); $i++){
  $user = $users[$i];
  $nickname = $nicknames[ mt_rand(0, count($nicknames)-1 )];

  $createUser = "INSERT INTO `users` (`id`, `username`, `nickname`, `password`) VALUES (NULL, '{$user}', '{$nickname}', '123');";
  if ($conn->query($createUser)) {
    echo "good! create a user: '$user'. <br> ";
  } else {
      echo " Error: {$conn->error} :
                      sql: {$postReply}  ";
  }
}

?>