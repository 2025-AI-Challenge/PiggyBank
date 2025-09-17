defmodule PiggybankWeb.PageController do
  use PiggybankWeb, :controller

  def home(conn, _params) do
    conn
    |> assign(:page_title, "홈")
    |> render_inertia("HomePage")
  end

  def features(conn, _params) do
    conn
    |> assign(:page_title, "기능")
    |> render_inertia("FeaturesPage")
  end

  def how_it_works(conn, _params) do
    conn
    |> assign(:page_title, "How It Works")
    |> render_inertia("HowItWorksPage")
  end

  def community(conn, _params) do
    conn
    |> assign(:page_title, "커뮤니티")
    |> render_inertia("CommunityPage")
  end

  def events(conn, _params) do
    conn
    |> assign(:page_title, "이벤트")
    |> render_inertia("EventsPage")
  end
end
