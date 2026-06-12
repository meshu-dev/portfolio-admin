[![Test Build Status](https://github.com/meshu-dev/portfolio-admin/actions/workflows/ci.yml/badge.svg)](https://github.com/meshu-dev/portfolio-admin/actions)

A Laravel app to manage data for my CV and Portfolio websites via an admin panel built with Vue.js.

## Setup

Run the setup command setup .env install composer / node dependancies.

```bash
composer run setup
```

Edit the .env file and fill in values.

Run database migrations after filling in databse credentials.

```bash
php artisan migrate
```

Run database seeder.

```bash
php artisan db:seed
```

Run the app.

```bash
composer run dev
```

## Commands

Running unit tests.

```bash
php artisan test
```

Check code coverage.

```bash
php artisan test --coverage
```

Running PHPStan checks.

```bash
composer run phpstan
```

Running Lint checks.

```bash
composer run test:lint
```

## Notes

Current Laravel version is 12.

[Upgrade to Laravel 13 guide](https://laravel.com/docs/13.x/upgrade)

[Laravel Security Support dates](https://laravel.com/docs/12.x/releases#support-policy)
