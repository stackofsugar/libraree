[
  "Julian McGrath", "Benjamin Parsons", "Anne Buckland", "Jane Wallace", "Kimberly Walker",
  "Joan Baker", "Irene Parsons", "Elizabeth Edmunds", "Ella Kerr", "Leonard Wilson",
  "Charles Black", "Jack Johnston", "Sonia Nolan", "Lillian Edmunds", "Anne Robertson",
  "Wanda Butler", "Ian Hudson", "Sonia Sharp", "Ava Thomson", "Sophie Abraham",
  "Wendy Davidson", "Amelia Parr", "Penelope North", "Deirdre Wright", "Joseph Young",
  "Natalie Kelly", "Maria Cornish", "Stephen Rutherford", "Amelia Arnold", "Neil Mitchell",
  "Leonard Oliver", "Carl Newman", "Cameron Wilkins", "Faith Turner", "Joshua MacDonald",
  "Una Davidson", "Owen Kerr", "Jan Taylor", "Theresa Walker", "Ryan Terry",
  "Abigail Metcalfe", "Penelope Randall", "Donna Skinner", "Yvonne Harris", "Neil Avery",
  "Neil Manning", "Max Black", "Deirdre Rees", "Justin Campbell", "Donna Hill"
].map.with_index do |name, index|
  {
    name: name,
    email_address: name.sub(" ", "").downcase + "@example.com",
    id_card_number: rand(10000..99999),
    password_digest: BCrypt::Password.create(name.split.first.downcase + "Libraree123", cost: 12),
    is_admin: (index % 10) == 0
  }
end.tap do |ins|
  User.upsert_all(ins)
end

[
  "Nectar in a Sieve", "The Widening Gyre", "A Monstrous Regiment of Women", "Noli Me Tangere",
  "Alone on a Wide Wide Sea", "Mr Standfast", "Fear and Trembling", "Number the Stars",
  "Beyond the Mexique Bay", "The Yellow Meads of Asphodel", "The Torment of Others", "A Many-Splendoured Thing",
  "The House of Mirth", "The Skull Beneath the Skin", "Cabbages and Kings", "Stranger in a Strange Land",
  "Moab Is My Washpot", "A Handful of Dust", "Tirra Lirra by the River", "Frequent Hearses",
  "The Line of Beauty", "Nine Coaches Waiting", "The Last Enemy", "Waiting for the Barbarians",
  "For a Breath I Tarry", "Ah Wilderness!", "Time To Murder And Create", "To Sail Beyond the Sunset",
  "Beneath the Bleeding", "This Lime Tree Bower", "The World the Flesh and the Devil", "Vanity Fair",
  "The Moving Toyshop", "The Painted Veil", "This Side of Paradise", "A Scanner Darkly",
  "Blood's a Rover", "Recalled to Life", "The Glory and the Dream", "Clouds of Witness",
  "Cover Her Face", "The Way of All Flesh", "Butter In a Lordly Dish", "Carrion Comfort",
  "A Time to Kill", "Consider Phlebas", "To Your Scattered Bodies Go", "The Man Within",
  "Rosemary Sutcliff", "For Whom the Bell Tolls",
].map do |title|
  {
    title: title,
    isbn: rand(10000000000..99999999999),
    stock: rand(0..10),
  }
end.tap do |ins|
  Book.upsert_all(ins)
end
