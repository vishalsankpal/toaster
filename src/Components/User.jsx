const User = ({ onClick, image, text }) => {
  return (
    <li onClick={onClick}>
      <img src={image} alt={text} />
      <span>{text}</span>
    </li>
  );
};

export default User;
