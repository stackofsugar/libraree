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
