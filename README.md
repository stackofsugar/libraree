<div align="center">
    <h1>Libraree</h1>
</div>

<div align="center">
    <p>Library Management Demo App</p>
</div>

<a name="readme-top"></a>

## 📝 Table of Contents

- [Tech Stack](#stack)
- [Installation](#installation)
- [Requirements Checklist](#checklist)

## Tech Stack <a name="stack"></a>

- Rails 8, Ruby > 3.4.4
- React Router 7.9, React > 18, Node > 20
- Optional: PostgreSQL > 10

## Installation <a name="installation"></a>

To get started, clone this repository and `cd` to the root directory

```
$ git clone https://github.com/stackofsugar/libraree
$ cd libraree/
```

To install backend dependencies, you will need the same versions of Ruby used to build Libraree, which you can find using the `cat` command as follows:

```
$ cat .ruby-version
<Ruby version number>
```

Then, install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) at that version, or use a version manager (I reccomend [rbenv](https://rbenv.org/))

If you haven't already, Install or update [Node](https://nodejs.org/en/download)

### Backend Configuration

1. Install bundle using `bundle install`. Rebundle if you face problems with `rm -f Gemfile.lock`
1. Create the DB using `bin/rails db:create`
1. Migrate the DB using `bin/rails db:migrate`
1. Seed the DB using `bin/rails db:seed`
1. Run the server using `bin/dev`. If you face any problems with target IP or Port, you can change them in `bin/dev` file, or run the generic server command using `bin/rails server`

### Frontend Configuration

1. Navigate to frontend's root at `/libraree-client`
1. Copy `.env.example` to `.env` (`cp .env.example .env`) and change `VITE_API_ROOT` according to your backend's configuration
1. Install packages using `npm i`
1. Run development server using `npm run dev`
1. Open the URL specified in the terminal to access the website

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Requirements Checklist <a name="checklist"></a>

- [x] Data entry: Book, Borrower
- [x] Feature: Borrow / Return Book, Loan Tracking
- [x] Constraints:
  - [x] Return deadline
  - [x] One book per loan
  - [x] No concurrent loans
  - [x] Loan duration limit

### Additional Features

- Simple authentication with admins/non-admins to each borrower's accounts
