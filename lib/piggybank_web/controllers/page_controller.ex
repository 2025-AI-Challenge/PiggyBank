defmodule PiggybankWeb.PageController do
  use PiggybankWeb, :controller

  def home(conn, _params) do
    conn
    |> assign(:page_title, "홈")
    |> render_inertia("HomePage")
  end
end
