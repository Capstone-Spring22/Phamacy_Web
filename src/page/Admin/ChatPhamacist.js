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
import "../../assets/css2/stylesChat.css";
function ChatPharmacist() {
  // ...
  const [newMessage, setNewMessage] = useState("");
  const [newMessageType, setNewMessageType] = useState("text");
  const roomId = "";
  const userID = localStorage.getItem("userID");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState([]);
  const [userRoom, setUserRoom] = useState([]);
  const [patientId, setPatientId] = useState([]);

  async function fetchChat() {
    setLoading(true);
    const q = query(collection(db, "chats"));
    onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((r) => {
        const messagesRef = collection(r.ref, "messages");
        getDocs(messagesRef).then((mess) => {
          const messages = mess.docs.map((doc) => {
            return {
              id: doc.id,
              message: doc.data().message,
              type: doc.data().type,
              senderId: doc.data().senderId,
            };
          });

          rooms.push({
            id: r.id,
            messages: messages,
            data: r.data(),
          });

          setRooms(rooms);
         
        });
      });

      setLoading(false);
    });
  }
  async function fetchChatById() {
    setLoading(true);
    const q = query(collection(db, "chats"), where("patientId", "==", patientId));
    onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((r) => {
        const messagesRef = collection(r.ref, "messages");
        onSnapshot(messagesRef, (mess) => {
          const messages = mess.docs
            .filter((doc) => doc.data().senderId === patientId)
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
  useEffect(() => {
    console.log("room", roomsMsg);
    fetchChatById();
  }, [roomsMsg]);
  useEffect(() => {
    console.log("room", rooms);
    console.log("userRoom", userRoom);
    console.log("");
    fetchChat();
  }, []);
  const handlePatient = (patientId) => {
    setPatientId(patientId);
     console.log('patientId',patientId)
  };
  async function handleAddMessage(roomId) {
    const chatsRef = collection(db, "chats");
    console.log("patientId", patientId);
    const querySnapshot = await getDocs(
      query(
        chatsRef,
        where("patientId", "==", patientId),
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
        senderId: userID,
        timestamp: new Date(),
      });
    } else {
      // Create a new chat document and add the new message
      const newChatRef = await addDoc(chatsRef, {
        fontSize: 14,
        lastMessage: "cc",
        patientId: patientId,
        pharmacistId: "",
        request: "cc",
        status: "cc",
        timestamp: new Date(),
      });
      const messagesRef = collection(db, "chats", newChatRef.id, "messages");
      await addDoc(messagesRef, {
        message: newMessage,
        type: newMessageType,
        senderId: patientId,
        timestamp: new Date(),
      });
    }
    setNewMessage("");
  }

  return (
    <div>
      {/* ... */}
      <div>
        <>
          <div className="container">
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card chat-app">
                  <div id="plist" className="people-list">
                    <div className="input-group">
                      <button
                        className="button-23"
                        style={{
                          height: 26,
                          width: 50,
                          fontSize: 15,
                          borderRadius: 2,
                        }}
                      >
                        Add
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter text here..."
                        style={{ width: 200, height: 20 }}
                        //   onChange={(event) => {
                        //     setNewRoom(event.target.value);
                        //   }}
                      />
                    </div>
                    <br />
                    <br />

                    <div className="test">
                      <ul
                        className="list-unstyled chat-list mt-2 mb-0"
                        style={{ width: 200 }}
                      >
                        {rooms.map((item) => {
                          return (
                            <li
                              className="clearfix"
                              onClick={() => {
                                handlePatient(item.data.patientId);
                              }}
                            >
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                alt="avatar"
                              />
                              <div className="about">
                                <div className="name">{item.id}</div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="chat">
                    <div className="chat-header clearfix">
                      <div className="row">
                        <div className="col-lg-6">
                          <a
                            href="javascript:void(0);"
                            data-toggle="modal"
                            data-target="#view_info"
                          >
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                              alt="avatar"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="test2">
                      <div className="chat-history" style={{ height: 480 }}>
                        <ul className="m-b-0">
                          {rooms.map((room) => (
                            <div>
                              {room.messages &&
                                room.messages.length &&
                                room.messages.map((item) => {
                                  return (
                                    <li className="clearfix">
                                      <>
                                        <div
                                          className="message-data text-right"
                                          style={{ textAlign: "right" }}
                                        >
                                          <span className="message-data-time" >
                                            {item.dates}
                                          </span>
                                        </div>
                                        {item.type === "text" ?(<div className="message other-message float-right">
                                          {" "}
                                          {item.message}{" "}
                                        </div>):(<img  style={{height:100,width:100}} src={item.message}/>)}
                                        
                                      </>
                                    </li>
                                  );
                                })}
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <form
                      className="chat-message clearfix"
                      style={{ display: "flex" }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddMessage(roomId); // replace with  room ID
                      }}
                    >
                      <div className="input-group mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter text here..."
                          style={{ width: 800, height: 45 }}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                      </div>
                      <button
                        className="button-23"
                        style={{ height: 50, width: 100 }}
                      >
                        <span className="text">Send</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
     
    </div>
  );
}

export default ChatPharmacist;
