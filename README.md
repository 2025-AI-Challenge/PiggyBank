# Piggybank

## 프로젝트 셋업

1. Docker로 PostgreSQL 시작:
   ```bash
   docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```

2. 프론트엔드 의존성 설치:
   ```bash
   cd assets
   npm i
   cd ..
   ```

3. 프로젝트 셋업:
   ```bash
   mix setup
   ```

## 개발

Phoenix 서버 시작:

  * `mix phx.server` 또는 IEx에서 `iex -S mix phx.server`로 Phoenix 엔드포인트 시작

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
