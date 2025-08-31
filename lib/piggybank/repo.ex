defmodule Piggybank.Repo do
  use Ecto.Repo,
    otp_app: :piggybank,
    adapter: Ecto.Adapters.Postgres
end
