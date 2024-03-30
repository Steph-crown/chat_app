defmodule ChatAppWeb.HomeLive do
  use Phoenix.LiveView

  def mount(_params, _session, socket) do
    user_id = generate_dummy_user_id()
    user_name = "User #{user_id}"

    {:ok,
     socket
     |> assign(:user_id, user_id)
     |> assign(:user_name, user_name)}
  end

  defp generate_dummy_user_id() do
    "#{Time.utc_now() |> Time.to_string()}"
  end
end
