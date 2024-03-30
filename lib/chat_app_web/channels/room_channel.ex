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
        %{assigns: %{rooms: rooms, user_id: user_id}} = socket
      ) do
    room = %{
      "name" => name,
      "description" => description,
      "id" => length(rooms) + 1,
      "creator_id" => user_id
    }

    socket =
      socket
      |> assign(:rooms, [room | rooms])
      |> handle_join_room(room["id"])

    broadcast!(socket, "new_room", room)
    Logger.info("#{name} room created")

    {:reply, {:ok, payload}, socket}
  end

  @impl true
  def handle_in(
        "sync_rooms",
        %{"rooms" => rooms} = payload,
        socket
      ) do
    {:reply, {:ok, payload}, assign(socket, :rooms, rooms)}
  end

  def handle_in(
        "join_room",
        %{
          "room_id" => room_id
        } = payload,
        socket
      ) do
    socket = socket |> handle_join_room(room_id)
    broadcast!(socket, "updated_rooms", %{rooms: socket.assigns.rooms})

    {:reply, {:ok, payload}, socket}
  end

  defp handle_join_room(
         %{
           assigns: %{
             user_id: user_id,
             memberships: memberships
           }
         } = socket,
         room_id
       ) do
    membership = %{
      "user_id" => user_id,
      "room_id" => room_id,
      "id" => length(memberships) + 1
    }

    assign(socket, :memberships, [membership | memberships])
  end
end
