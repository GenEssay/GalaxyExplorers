# party-backend

![Coverage Report](assets/images/coverage.svg)

API documentation: [https://api.sparklab.zeeland.cn/docs](http://47.115.229.18:8055/docs)


## Startup in local

Conda package manager is recommended. Create a conda environment.

```bash
conda create -n party-backend python==3.10
```

Activate conda environment and install poetry

```bash
conda activate party-backend
```

Install third-party packages

```bash
make install
```

If failed, you can install third-party packages by the following method.

```bash
pip install -r ./requirements.txt
```

Copy `.env.example` to `.env` and fill in the environment variables if you need.

Run the following example to init a superuser.

```bash
python -m app.initial_data.py
```

superuser user and password config in your `.env` file.


Run the fastapi server on `http://127.0.0.1:8055`

```bash
make start
```

## Commit and Push to Repo

Before commit, you should run `make lint` firstly.

If you forget to run `make lint`, the Git will run pre-commit hooks before commit. If you want to skip pre-commit hooks, you can use `git commit --no-verify`.

> pre-commit will run `make lint` to check the code style by `make check-codestyle` and run `make test` to check the test cases. You can run `make formatting` to format the code style.

## Startup in Production

> Attention: Production environment is not recommended to run in local, it only supports running in the server by Github Actions.

Install relevant packages and startup the server.

```bash
make install-prod
make start-prod
```

Close process

```bash
make shutdown
```

## Database Migration

Create a new migration

```shell
make makemigrations -m "message here"
```

Apply the migration

```shell
make migrate
```

## Makefile usage

[`Makefile`](https://github.com/PromptsLego/party-backend/blob/master/Makefile) contains a lot of functions for faster development.

<details>
<summary>Install all dependencies and pre-commit hooks</summary>
<p>

Install requirements:

```bash
make install
```

Pre-commit hooks could be installed after `git init` via

```bash
make pre-commit-install
```

</p>
</details>

<details>
<summary>Codestyle and type checks</summary>
<p>

Automatic formatting uses `ruff`.

```bash
make formatting
```

Codestyle checks only, without rewriting files:

```bash
make check-codestyle
```

> Note: `check-codestyle` uses `ruff` and `darglint` library

</p>
</details>


<details>
<summary>Tests with coverage badges</summary>
<p>

Run `pytest`

```bash
make test
```

</p>
</details>

<details>
<summary>All linters</summary>
<p>

Of course there is a command to run all linters in one:

```bash
make lint
```

the same as:

```bash
make check-codestyle && make test && make check-safety
```

</p>
</details>

<details>
<summary>Docker</summary>
<p>

```bash
make docker-build
```

which is equivalent to:

```bash
make docker-build VERSION=latest
```

Remove docker image with

```bash
make docker-remove
```

More information [about docker](https://github.com/Undertone0809/python-package-template/tree/main/%7B%7B%20cookiecutter.project_name%20%7D%7D/docker).

</p>
</details>

<details>
<summary>Cleanup</summary>
<p>
Delete pycache files

```bash
make pycache-remove
```

Remove package build

```bash
make build-remove
```

Delete .DS_STORE files

```bash
make dsstore-remove
```

Remove .mypycache

```bash
make mypycache-remove
```

Or to remove all above run:

```bash
make cleanup
```

</p>
</details>

## 📈 Releases

You can see the list of available releases on the [GitHub Releases](https://github.com/PromptsLego/party-backend/releases) page.

We follow [Semantic Versions](https://semver.org/) specification.

We use [`Release Drafter`](https://github.com/marketplace/actions/release-drafter). As pull requests are merged, a draft release is kept up-to-date listing the changes, ready to publish when you’re ready. With the categories option, you can categorize pull requests in release notes using labels.

### List of labels and corresponding titles

|               **Label**               |  **Title in Releases**  |
| :-----------------------------------: | :---------------------: |
|       `enhancement`, `feature`        |       🚀 Features       |
| `bug`, `refactoring`, `bugfix`, `fix` | 🔧 Fixes & Refactoring  |
|       `build`, `ci`, `testing`        | 📦 Build System & CI/CD |
|              `breaking`               |   💥 Breaking Changes   |
|            `documentation`            |    📝 Documentation     |
|            `dependencies`             | ⬆️ Dependencies updates |

You can update it in [`release-drafter.yml`](https://github.com/PromptsLego/party-backend/blob/master/.github/release-drafter.yml).

GitHub creates the `bug`, `enhancement`, and `documentation` labels for you. Dependabot creates the `dependencies` label. Create the remaining labels on the Issues tab of your GitHub repository, when you need them.

## Credits [![🚀 Your next Python package needs a bleeding-edge project structure.](https://img.shields.io/badge/python--package--template-%F0%9F%9A%80-brightgreen)](https://github.com/Undertone0809/python-package-template)

This project was generated with [`python-package-template`](https://github.com/Undertone0809/python-package-template)


## References

- [fastapi](https://fastapi.tiangolo.com/)
- [sqlmodel](https://sqlmodel.tiangolo.com/)
- [openai-proxy](https://tauyisiv.cloud.sealos.io/openai/v1)
