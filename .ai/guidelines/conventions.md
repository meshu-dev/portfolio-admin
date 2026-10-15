## Our conventions

- Use Form Request classes for all validation.
- Put business logic in `app/Actions`, not controllers.
- Use Pest for tests, not PHPUnit syntax.
- Group `use` imports that share a namespace into one statement when possible, e.g. `use App\Enums\{FileTypeEnum, TypeEnum};` instead of one `use` per class.
- Action classes use `execute()` as their main method. Put any helpers in separate private or protected methods.
