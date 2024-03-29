defmodule ChatAppWeb.RoomChannel do
  use ChatAppWeb, :channel
  require Logger

  @impl true
  def join("room", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in(
        "create_room",
        %{"name" => name, "description" => description} = payload,
        %{assigns: %{rooms: rooms}} = socket
      ) do
    room = %{
      "name" => name,
      "description" => description,
      "id" => length(rooms) + 1
    }

    broadcast!(socket, "new_room", room)
    Logger.info("#{name} room created")
    IO.inspect([room | socket.assigns.rooms])
    {:reply, {:ok, payload}, assign(socket, :rooms, [room | socket.assigns.rooms])}
  end
end
