defmodule Piggybank.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      PiggybankWeb.Telemetry,
      Piggybank.Repo,
      {DNSCluster, query: Application.get_env(:piggybank, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Piggybank.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Piggybank.Finch},
      # Start a worker by calling: Piggybank.Worker.start_link(arg)
      # {Piggybank.Worker, arg},
      # Start to serve requests, typically the last entry
      PiggybankWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Piggybank.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PiggybankWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
