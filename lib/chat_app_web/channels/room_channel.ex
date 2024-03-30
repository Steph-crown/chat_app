defmodule ChatAppWeb.RoomChannel do
  use ChatAppWeb, :channel
  require Logger

  intercept ["update_rooms", "new_room"]

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
    broadcast!(socket, "update_rooms", %{rooms: socket.assigns.rooms})

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

  @impl true
  def handle_out("new_room", room, socket) do
    is_member = is_member_of_room?(socket, room["id"])
    room = Map.put(room, "is_member", is_member)
    push(socket, "new_room", room)

    {:noreply, socket}
  end

  @impl true
  def handle_out("update_rooms", %{"rooms" => rooms}, socket) do
    rooms =
      Enum.map(rooms, fn room ->
        is_member = is_member_of_room?(socket, room["id"])
        Map.put(room, "is_member", is_member)
      end)

    push(socket, "update_rooms", %{rooms: rooms})

    {:noreply, socket}
  end

  defp is_member_of_room?(
         %{
           assigns: %{
             memberships: memberships,
             user_id: user_id
           }
         },
         room_id
       ) do
    Enum.any?(memberships, fn membership ->
      membership["room_id"] == room_id && membership["user_id"] == user_id
    end)
  end
end
