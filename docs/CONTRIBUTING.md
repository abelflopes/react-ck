# Reack CK | Contributing

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure the code lints without errors.
4. Write tests if applicable.
5. Submit a pull request.

## Commands

- `prepare`: Installs Husky.
- `start`: Starts all applications in parallel, excluding configuration files and application files.
- `start:apps`: Starts only the individual apps in parallel.
- `build`: Builds all packages except configuration files, documentation files, and application files.
- `build:infra`: Builds only the infrastructure configuration.
- `build:docs`: Builds only the documentation.
- `build:apps`: Builds only the individual apps.
- `test`: Sequentially runs all test commands.
- `test:unit`: Parallelly runs unit tests for all packages.
- `test:snapshot`: Parallelly runs snapshot tests for all packages.
- `test:snapshot:update`: Parallelly updates snapshot tests.
- `lint`: Sequentially runs all lint commands.
- `lint:style`: Lints all SCSS files.
- `lint:code`: Lints code for all packages.
- `lint:code:fix`: Lints and fixes code for all packages in parallel.
- `lint:typescript`: Lints TypeScript code.
- `format`: Checks formatting using Prettier.
- `clean`: Removes build artifacts and coverage reports.
- `clean:cache`: Removes linting and caching artifacts.
- `clean:deps`: Removes all node_modules directories.
- `audit`: Runs security audits for all packages.
- `todo`: Scans for TODO comments in the project.

