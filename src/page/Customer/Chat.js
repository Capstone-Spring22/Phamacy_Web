import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase";

function Chat() {
  // ...

  const userID = localStorage.getItem("userID");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState([]);
  const [userRoom, setUserRoom] = useState([]);
  const [patientId, setPatientId] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageType, setNewMessageType] = useState("text");
  const roomId = "";
  const [countUs, setCountUs] = useState("2");
  const id = localStorage.getItem("id");
  const [showChat, setShowChat] = useState(false);
  async function fetchChatById() {
    setLoading(true);
    const q = query(collection(db, "chats"), where("patientId", "==", id));
    onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((r) => {
        const messagesRef = collection(r.ref, "messages");
        onSnapshot(messagesRef, (mess) => {
          const messages = mess.docs
            .filter((doc) => doc.data().senderId === id)
            .map((doc) => {
              return {
                id: doc.id,
                message: doc.data().message,
                type: doc.data().type,
                senderId: doc.data().senderId,
                timestamp: doc.data().timestamp,
              };
            });
          messages.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
          const newRooms = [
            ...rooms.filter((room) => room.id !== r.id), // loại bỏ phòng cũ (nếu có) khỏi mảng mới
            {
              id: r.id,
              messages: messages,
              data: r.data(),
            },
          ];

          setRooms(newRooms);
        });
      });
    });

    setLoading(false);
  }
  const handleChatToggle = () => {
    setShowChat(!showChat);
  };
  useEffect(() => {
    fetchChatById();
  }, []);

  async function fetchChatByPharmacist() {
    setLoading(true);
    const q = query(collection(db, "chats"));
    onSnapshot(q, (querySnapshot) => {
      const roomsMsg = [];
      querySnapshot.forEach((r) => {
        const messagesRef = collection(r.ref, "messages");
        onSnapshot(messagesRef, (mess) => {
          const messages = mess.docs.map((doc) => {
            return {
              id: doc.id,
              message: doc.data().message,
              type: doc.data().type,
              senderId: doc.data().senderId,
              timestamp: doc.data().timestamp,
            };
          });
          messages.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
          // Tạo một mảng mới từ roomsMsg và thêm phần tử mới vào mảng
          const newRoomsMsg = [
            ...roomsMsg.filter((room) => room.id !== r.id), // loại bỏ phòng cũ (nếu có) khỏi mảng mới
            {
              id: r.id,
              messages: messages,
              data: r.data(),
            },
          ];

          setRoomsMsg(newRoomsMsg);
        });
      });

      setLoading(false);
    });
  }
  const handleClickMsg = () => {
    // send the message
    setNewMessage("");
  };
  const handleClickCount = () => {
    setCountUs(parseInt(countUs) + 1);
  };
  useEffect(() => {
    console.log("room", rooms);
    fetchChatByPharmacist();
  }, [countUs]);
  async function handleAddMessage(roomId) {
    // Get the chats collection
    const chatsRef = collection(db, "chats");

    // Check if a chat already exists for the given patient and pharmacist
    const querySnapshot = await getDocs(
      query(
        chatsRef,
        where("patientId", "==", id),
        where("pharmacistId", "==", "")
      )
    );

    if (querySnapshot.docs.length > 0) {
      // A chat already exists, use its ID to add the new message
      const chatId = querySnapshot.docs[0].id;
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        message: newMessage,
        type: newMessageType,
        senderId: id,
        timestamp: new Date(),
      });
    } else {
      // Create a new chat document and add the new message
      const newChatRef = await addDoc(chatsRef, {
        fontSize: 14,
        lastMessage: "cc",
        patientId: id,
        pharmacistId: "",
        request: "cc",
        status: "cc",
        timestamp: new Date(),
      });
      const messagesRef = collection(db, "chats", newChatRef.id, "messages");
      await addDoc(messagesRef, {
        message: newMessage,
        type: newMessageType,
        senderId: id,
        timestamp: new Date(),
      });
    }

    setNewMessage("");
  }

  return (
    <div>
      {/* ... */}
      <button onClick={handleChatToggle} className="button-open-chat">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-wechat"
          viewBox="0 0 16 16"
        >
          <path d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.324.324 0 0 0-.12.366l.218.81a.616.616 0 0 1 .029.117.166.166 0 0 1-.162.162.177.177 0 0 1-.092-.03l-1.057-.61a.519.519 0 0 0-.256-.074.509.509 0 0 0-.142.021 5.668 5.668 0 0 1-1.576.22ZM9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.615.615 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.627.627 0 0 0 .098.356Z" />
          <path d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.499.499 0 0 0-.032.14.192.192 0 0 0 .193.193c.039 0 .077-.01.111-.029l1.268-.733a.622.622 0 0 1 .308-.088c.058 0 .116.009.171.025a6.83 6.83 0 0 0 1.625.26 4.45 4.45 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02.05 0 .1 0 .15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826Zm4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Zm3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Z" />
        </svg>
      </button>
      {showChat && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMessage(roomId); // replace with  room ID
          }}
        >
          <div className="wrapper-chat">
            <div className="chat-box">
              <div className="chat-head">
                <h2>Chat Box</h2>
              </div>
              <div className="chat-body">
                <div
                  className="msg-insert"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {roomsMsg.map((room2) => (
                    <div>
                      {room2.messages &&
                        room2.messages.length &&
                        room2.messages
                          .sort((a, b) => a.timestamp - b.timestamp)
                          .map((item2) => {
                            return (
                              <div
                                className={
                                  item2.senderId === id
                                    ? "msg-send"
                                    : "msg-receive"
                                }
                                key={item2.timestamp}
                              >
                                {item2.message}
                              </div>
                            );
                          })}{" "}
                    </div>
                  ))}
                </div>

                <div className="chat-text">
                  <textarea
                    placeholder="Send"
                    defaultValue={""}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
                {newMessage && (
                  <button type="submit" onClick={handleClickCount}>
                    Send
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMessage(roomId); // replace with  room ID
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <label>
          <input
            type="radio"
            value="text"
            checked={newMessageType === "text"}
            onChange={() => setNewMessageType("text")}
          />
          Text
        </label>
        <label>
          <input
            type="radio"
            value="image"
            checked={newMessageType === "image"}
            onChange={() => setNewMessageType("image")}
          />
          Image
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
