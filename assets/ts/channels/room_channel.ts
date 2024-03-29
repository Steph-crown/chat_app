import socket from "./../user_socket";

const roomChannel = socket.channel("room", {});

roomChannel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined room channel successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

export default roomChannel;
