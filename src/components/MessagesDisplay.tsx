import MessageDisplay from "./MessageDisplay";

interface UserMessage {
  role: string;
  content: string;
}

interface MessagesDisplayProps {
  userMessages: UserMessage[];
}

const MessagesDisplay = ({ userMessages }: MessagesDisplayProps) => {
  return (
    <div className="messages-display">
      {userMessages.map((message, index) => (
        <MessageDisplay key={index} message={message} />
      ))}
    </div>
  );
};
export default MessagesDisplay;
