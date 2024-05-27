import serenity from "@/images/logos/serenity-stroke.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

export function ChatBot() {
  // An array that stores the chat messages
  const [chat, setChat] = useState([]);
  // String that stores the user input
  const [inputMessage, setInputMessage] = useState("");

  // ensures the latest message are always in view
  useEffect(() => {
    // Locate the input field postion in the UI
    const objDiv = document.getElementById("messageArea");
    // Scroll to this position
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    // Prepare the data to be sent as a HTTP request to the rasa server
    evt.preventDefault();
    const name = "user";
    const requestTemp = { sender: "user", senderId: name, msg: inputMessage };

    // Make sure that a valid message sent
    if (inputMessage !== "") {
      setChat((prevChat) => [...prevChat, requestTemp]);
      setInputMessage("");
      // Call the function that sends HTTP request to the rasa server
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter a valid message");
    }
  };
//makes http request to the server
  const rasaAPI = async function handleClick(name, msg) {
    try {
      const response = await fetch(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            charset: "UTF-8",
          },
          credentials: "same-origin",
          body: JSON.stringify({ sender: name, message: msg }),
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse && jsonResponse.length > 0) {
        // Extract the message from the response
        const temp = jsonResponse[0];
        const recipientId = temp["recipient_id"];
        const recipientMsg = temp["text"];

        const responseTemp = {
          sender: "bot",
          recipientId: recipientId,
          msg: recipientMsg,
        };
        // Add it to the array of chat messages
        setChat((prevChat) => [...prevChat, responseTemp]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-8">
      <div className=" bg-primary rounded-lg max-w-2xl mx-auto p-4 flex flex-col h-[60vh] gap-4">
        <div className="flex items-center gap-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
            <Image src={serenity} alt="" fill className="object-cover" />
          </div>
          <p className="font-medium text-white">Serenity</p>
        </div>
        <div
          id="messageArea"
          className="py-4 px-6 overflow-y-auto flex-grow bg-white rounded-lg"
        >
          <div className="flex flex-col space-y-2">
            {chat.map((user, key) => (
              <div
                key={key}
                className={`${
                  user.sender === "bot"
                    ? "bg-primary text-white mr-auto"
                    : "bg-gray-200 ml-auto"
                } p-3 rounded-lg shadow-md max-w-[85%] break-words`}
              >
                <h5>{user.msg}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4 rounded-b-lg bg-primary text-white">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <div className="flex-1 pr-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="w-full p-2 rounded text-black border-transparent placeholder:text-gray-400 placeholder:font-light"
                placeholder="Type here..."
              />
            </div>
            <div className="flex-initial pl-2">
              <button type="submit" className="rounded-full bg-white p-2">
                <IoMdSend className="text-primary w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
