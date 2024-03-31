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
      |> handle_set_active_room(room)

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
    room = get_room_by_id(socket, room_id)

    socket =
      socket
      |> handle_join_room(room_id)
      |> handle_set_active_room(room)

    broadcast!(socket, "update_rooms", %{rooms: socket.assigns.rooms})

    {:reply, {:ok, payload}, socket}
  end

  def handle_in(
        "set_active_room",
        %{"room_id" => room_id},
        socket
      ) do
    room = get_room_by_id(socket, room_id)

    cond do
      %{"is_member" => true} = room ->
        socket = handle_set_active_room(socket, room)
        {:reply, {:ok, room}, socket}

      true ->
        {:reply, {:error, "You are not a member of this room"}, socket}
    end
  end

  def handle_in(
        "get_room_members",
        %{"room_id" => room_id},
        %{assigns: %{memberships: memberships}} = socket
      ) do
    members =
      Enum.map(memberships, fn membership ->
        if membership["room_id"] == room_id do
          membership["user_id"]
        end
      end)
      |> Enum.filter(&(&1 != nil))

    {:reply, {:ok, members}, socket}
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
  def handle_out("update_rooms", %{rooms: rooms}, socket) do
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

  defp handle_set_active_room(socket, room) do
    # push/3 only sends event to the calling client, broadcast! sends to all clients connected to topic
    push(socket, "update_active_room", room)
    assign(socket, :active_room_id, room["id"])
  end

  defp get_room_by_id(
         %{assigns: %{rooms: rooms}},
         room_id
       ) do
    Enum.find(rooms, fn room -> room["id"] == room_id end)
  end
end
