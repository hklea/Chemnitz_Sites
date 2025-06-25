type LoginButtonProps = {
  buttonName: string;
  onClick?: () => void; 
};

function LoginButton({ buttonName, onClick }: LoginButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
    >
      {buttonName}
    </button>
  );
}

export default LoginButton;
